import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

import { FixedSizeList as List } from "react-window";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { ReactComponent as LeftArrowSvg } from "./assets/left-arrow.svg";
import { ReactComponent as RightArrowSvg } from "./assets/right-arrow.svg";
import { ReactComponent as SortSvg } from "./assets/sort.svg";
import { ReactComponent as ResetSvg } from "./assets/reset.svg";

const useOverflowAction = (actionFunction) => {
  //overflow hook for showing tippy
  const ref = useRef();
  function checkOverflow(el) {
    const curOverflow = el.style.overflow;
    if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";
    const isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
    el.style.overflow = curOverflow;
    return isOverflowing;
  }
  useEffect(() => {
    if (checkOverflow(ref.current)) {
      actionFunction(ref);
    }
  }, [ref]);
  return ref;
};

function useTimeoutFn(fn, ms = 0) {
  const ready = useRef(false);
  const timeout = useRef();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}

function useDebounce(fn, ms = 0, deps = []) {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
}

function sortData(col, asc, dataset) {
  let key = col.key;
  let dataType = typeof dataset[0][key];
  //account for numbers that are strings
  if (dataType === "string") {
    if (Number(dataset[0][key])) {
      dataType = "number";
    }
  }
  let result = dataset;

  if (dataType === "string") {
    if (asc !== 2) {
      result = dataset.sort(function (a, b) {
        if (b[key] > a[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      });
    } else {
      result = dataset.sort(function (a, b) {
        if (a[key] > b[key]) {
          return -1;
        }
        if (b[key] > a[key]) {
          return 1;
        }
        return 0;
      });
    }
  }
  if (dataType === "boolean") {
    if (asc !== 2) {
      result = dataset.sort(function (x) {
        return x[key] ? -1 : 1;
      });
    } else {
      result = dataset.sort(function (x) {
        return x[key] ? 1 : -1;
      });
    }
  }
  if (dataType === "number") {
    if (asc !== 2) {
      result = dataset.sort(function (a, b) {
        return b[key] - a[key];
      });
    } else {
      result = dataset.sort(function (a, b) {
        return a[key] - b[key];
      });
    }
  }
  return result;
}

const CheckBox = ({ checked, onChecked, onUnChecked }) => {
  return (
    <div className="ezrt-checkbox">
      <label className="ezrt-checkbox--form-control">
        <input
          checked={checked}
          onChange={(e) => {
            if (e.target.checked) {
              onChecked();
            } else {
              onUnChecked();
            }
          }}
          type="checkbox"
          name="checkbox"
        />
      </label>
    </div>
  );
};

const Cell = ({ children: value, rowHeight, format, justify, item }) => {
  const overflowRef = useOverflowAction((ref) => {
    if (typeof value === "string" || typeof value === "number") {
      tippy(ref.current, {
        animation: "scale",
        placement: "top-start",
      });
    }
  });
  let tipOptions = {};
  if (typeof value === "string" || typeof value === "number") {
    tipOptions["data-tippy-content"] = value;
  }
  if (!format) {
    format = () => {
      if (typeof value === "boolean") {
        value = String(value);
      }
      if (typeof value === "undefined") {
        value = "-";
      }
      if (typeof value === "string" && value === "") {
        value = "-";
      }
      return value;
    };
  }
  return (
    <div
      className="ezrt-row--cell"
      {...tipOptions}
      ref={overflowRef}
      style={{
        height: rowHeight,
        padding: "0 5px",
        display: "flex",
        alignItems: "center",
        justifyContent: justify,
      }}
    >
      {format(value, item)}
    </div>
  );
};

const Header = ({
  rowHeight,
  idx,
  children: value,
  onMouseDownHandler,
  addRef,
  active,
  handleSortSelect,
  sort: Sort,
}) => {
  const headerRef = useRef();

  useEffect(() => {
    addRef(headerRef);
  }, []);
  return (
    <div
      ref={headerRef}
      style={{
        height: rowHeight,
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        cursor: "pointer",
      }}
      className="ezrt-headers--cell"
    >
      <span onClick={handleSortSelect}>{value}</span>
      <Sort />
      <span
        onMouseDown={onMouseDownHandler}
        className={`resize-handle ${active ? "active" : "idle"}`}
        style={{
          width: "2px",
          height: "100%",
          position: "relative",
          zIndex: "100",
        }}
      />
    </div>
  );
};

export default function EzReactTable({
  cols,
  data,
  rowHeight = 30,
  showCols = cols.length,
  tableHeight = 500,
  toolbar: Toolbar,
  selectable = null,
  initialSelected = [],
  onSelect = null,
  title,
}) {
  const defaultGridTemplateColumn = selectable
    ? `50px repeat(${showCols}, minmax(60px, 1fr))`
    : `repeat(${showCols}, minmax(60px, 1fr))`;
  const parentRef = useRef();
  const inputRef = useRef();
  const windowRef = useRef();
  const [selected, setSelected] = useState(initialSelected);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(null);
  const [dataset, setDataset] = useState(data);
  const [defaultColWidth, setDefaultColWidth] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [gridTemplateColumns, setGridTemplateColumns] = useState(
    defaultGridTemplateColumn
  );
  const refs = useRef(Array.from(Array(showCols)));
  useEffect(() => {
    if (!parentRef.current) {
      return setDefaultColWidth;
    }
    if (defaultColWidth === 0) {
      setDefaultColWidth(
        parentRef.current.getBoundingClientRect().width / showCols
      );
    }
  }, [parentRef]);
  useEffect(() => {
    if (query) {
      let datum = data.filter((d) => JSON.stringify(d).includes(query));
      setDataset(datum.length ? datum : []);
    } else {
      setDataset(data);
    }
  }, [data]);

  useDebounce(
    () => {
      if (query) {
        let datum = data.filter((d) =>
          JSON.stringify(d).toLowerCase().includes(query)
        );
        setDataset(datum.length ? datum : []);
      } else {
        setDataset(data);
      }
    },
    500,
    [query]
  );
  const handleSortSelect = (idx) => {
    if (sort && sort[0] === idx) {
      let dir = sort[1] === 1 ? 2 : null;
      if (!dir) {
        return setSort(null);
      }
      return setSort([idx, dir]);
    }
    return setSort([idx, 1]);
  };
  const mouseDown = (index) => {
    setActiveIndex(index);
  };
  const mouseMove = useCallback(
    (e) => {
      const gridColumns = refs.current.map((col, i) => {
        if (i === activeIndex) {
          // Calculate the desired width
          const horizontalScrollOffset = document.documentElement.scrollLeft;
          const width =
            horizontalScrollOffset + e.clientX - col.current.offsetLeft;
          const min = col.current.children[0].offsetWidth + 30;
          return Math.max(min, width) + "px";
          // Update the column object with the new size value
          // const column = columns.find(({ header }) => header === headerBeingResized);
          // column.size = Math.max(min, width) + 'px'; // Enforce our minimum
          // Calculate the column width
          // if (col.current.offsetLeft <= 0) {
          //   return `${width}px`;
          // }
          // const width = e.offsetWidth - 15 - col.current.offsetLeft;
          // if (width < col.current.children[0].offsetWidth + 30 && width > 0) {
          //   return `${col.current.children[0].offsetWidth + 30}px`;
          // }
          // return `${width}px`;
        }
        return `${col.current.offsetWidth}px`;
      });
      let checkCol = selectable ? "50px " : "";
      setGridTemplateColumns(`${checkCol}${gridColumns.join(" ")}`);
      //   parentRef.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
    },
    [activeIndex]
  );
  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);
  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);
  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }
    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);
  // selection
  const passedSelectHandler = useMemo(() => {
    if (!onSelect) {
      return null;
    }
    return (params) => setTimeout(() => onSelect(params), 1);
  }, [onSelect]);
  const selectAll = () => {
    let update = dataset.map((d) => d[selectable]);
    setSelected(update);
    if (passedSelectHandler) {
      passedSelectHandler(update);
    }
  };
  const unSelectAll = () => {
    setSelected([]);
    if (passedSelectHandler) {
      passedSelectHandler([]);
    }
  };
  const selectOne = (idx) => {
    let update = [...selected, idx];
    setSelected(update);
    if (passedSelectHandler) {
      passedSelectHandler(update);
    }
  };
  const unselectOne = (idx) => {
    const update = selected.filter((s) => s !== idx);
    setSelected(update);
    if (passedSelectHandler) {
      passedSelectHandler(update);
    }
  };
  //column pagination
  const prevColumn = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
      setGridTemplateColumns(defaultGridTemplateColumn);
      setSort(null);
    }
  };
  const nextColumn = () => {
    if (
      cols.slice(startIndex + 1, startIndex + 1 + showCols).length === showCols
    ) {
      setGridTemplateColumns(defaultGridTemplateColumn);
      setStartIndex(startIndex + 1);
      setSort(null);
    }
  };
  const resetColumn = () => {
    setGridTemplateColumns(defaultGridTemplateColumn);
    setStartIndex(0);
    setSort(null);
  };
  let activeCols = useMemo(() => {
    return cols.slice(startIndex, startIndex + showCols);
  }, [startIndex]);

  let sorted = useMemo(() => {
    try {
      if (sort) {
        return sortData(activeCols[sort[0]], sort[1], dataset);
      } else {
        return dataset;
      }
    } catch (e) {
      return dataset;
    }
  }, [sort, dataset]);
  let selectedItems = useMemo(() => {
    return data.filter((d) => selected.includes(d[selectable]));
  }, [selected]);
  let Title = useMemo(() => {
    return typeof title === "function" ? title() : title;
  }, []);
  Toolbar = !Toolbar ? null : (
    <Toolbar selected={selectedItems} clearSelected={unSelectAll} />
  );
  return (
    <div className="ezrt" style={{ width: "100%" }}>
      <div className="ezrt-head">
        <div className="ezrt-head--banner">{Title}</div>
        <div className="ezrt-head--options">
          <div className="ezrt-head--search">
            <input
              className="ezrt-head--search-input"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <span
                onClick={() => {
                  setQuery("");
                  inputRef.current.focus();
                }}
                className="ezrt-head--search-x"
              >
                ???
              </span>
            )}
          </div>
          <div className="ezrt-head--tools">{Toolbar}</div>
        </div>
      </div>
      <div className="ezrt-body">
        <div className="ezrt-headers">
          <div className="ezrt-headers--select">
            {showCols < cols.length && (
              <span onClick={prevColumn}>
                <LeftArrowSvg id="ezrt-col-paginate--left" />
              </span>
            )}
            <span onClick={resetColumn}>
              <ResetSvg id="ezrt-col-paginate--reset" />
            </span>
            {showCols < cols.length && (
              <span onClick={nextColumn}>
                <RightArrowSvg id="ezrt-col-paginate--right" />
              </span>
            )}
          </div>
          <div
            className="ezrt-headers--row"
            ref={parentRef}
            style={{
              display: "grid",
              gridTemplateColumns,
            }}
          >
            {selectable && (
              <div
                style={{
                  height: rowHeight,
                  display: "flex",
                  justifyContent: "center",
                  padding: "0 5px",
                }}
                className="ezrt-headers--cell"
              >
                <CheckBox
                  checked={
                    selected.length === 0
                      ? false
                      : !query
                      ? selected.length === data.length
                      : selected.length === dataset.length
                  }
                  onChecked={selectAll}
                  onUnChecked={unSelectAll}
                />
              </div>
            )}
            {activeCols.map((c, idx) => {
              return (
                <Header
                  idx={idx}
                  key={idx}
                  addRef={(ref) => {
                    refs.current[idx] = ref;
                  }}
                  sort={() =>
                    sort && idx === sort[0] ? (
                      <SortSvg
                        id="ezrt-headers--cell-sort"
                        style={{
                          position: "absolute",
                          right: "5px",
                          transform: `rotate(${
                            sort[1] === 1 ? "180" : "0"
                          }deg)`,
                        }}
                      />
                    ) : null
                  }
                  handleSortSelect={() => handleSortSelect(idx)}
                  onMouseDownHandler={() => mouseDown(idx)}
                  rowHeight={rowHeight}
                  active={activeIndex === idx}
                >
                  {c.title}
                </Header>
              );
            })}
          </div>
        </div>
        <div className="ezrt-rows">
          <SimpleBar style={{ height: tableHeight }}>
            {({ scrollableNodeRef, contentNodeRef }) => {
              return (
                <List
                  ref={windowRef}
                  className="eztr-rows--virtual"
                  innerRef={contentNodeRef}
                  outerRef={scrollableNodeRef}
                  height={tableHeight}
                  width="100%"
                  onItemsRendered={({
                    overscanStartIndex,
                    overscanStopIndex,
                    visibleStartIndex,
                    visibleStopIndex,
                  }) => {
                    // All index params are numbers.
                    // searchInputProps.value === ""
                    // if (
                    //   visibleStopIndex === data.length - 1 &&
                    //   infiniteLoader &&
                    //   !load
                    // ) {
                    //   infiniteLoader(visibleStopIndex);
                    // setLoad(true);
                    // }
                  }}
                  itemCount={sorted.length}
                  itemSize={rowHeight}
                >
                  {({ index, style }) => {
                    const item = sorted[index];
                    return (
                      <div
                        style={{
                          ...style,
                          display: "grid",
                          gridTemplateColumns,
                        }}
                        key={index}
                        className="ezrt-row"
                      >
                        {selectable && (
                          <div
                            className="ezrt-row--cell"
                            style={{
                              height: rowHeight,
                              padding: "0 5px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CheckBox
                              checked={selected.includes(item[selectable])}
                              onChecked={() => selectOne(item[selectable])}
                              onUnChecked={() => unselectOne(item[selectable])}
                            />
                          </div>
                        )}
                        {activeCols.map((col, idx) => {
                          return (
                            <Cell
                              key={idx}
                              rowHeight={rowHeight}
                              format={col?.format}
                              item={item}
                              justify={col?.align || "flex-start"}
                            >
                              {item[col.key]}
                            </Cell>
                          );
                        })}
                      </div>
                    );
                  }}
                </List>
              );
            }}
          </SimpleBar>
        </div>
        <div className="ezrt-footer">
          <div className="ezrt-count">
            {selectable && selected.length
              ? `${selected.length} items selected out of ${data.length}`
              : `${dataset.length}`}
          </div>
        </div>
      </div>
    </div>
  );
}
