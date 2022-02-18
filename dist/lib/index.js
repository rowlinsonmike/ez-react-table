"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EzReactTable;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.json.stringify.js");

var _react = _interopRequireWildcard(require("react"));

var _reactWindow = require("react-window");

var _simplebarReact = _interopRequireDefault(require("simplebar-react"));

require("simplebar/dist/simplebar.min.css");

require("./styles.css");

var _tippy = _interopRequireDefault(require("tippy.js"));

require("tippy.js/dist/tippy.css");

require("tippy.js/animations/scale.css");

var _leftArrow = require("./assets/left-arrow.svg");

var _rightArrow = require("./assets/right-arrow.svg");

var _sort2 = require("./assets/sort.svg");

var _reset = require("./assets/reset.svg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useOverflowAction = actionFunction => {
  //overflow hook for showing tippy
  const ref = (0, _react.useRef)();

  function checkOverflow(el) {
    const curOverflow = el.style.overflow;
    if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";
    const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
    el.style.overflow = curOverflow;
    return isOverflowing;
  }

  (0, _react.useEffect)(() => {
    if (checkOverflow(ref.current)) {
      actionFunction(ref);
    }
  }, [ref]);
  return ref;
};

function useTimeoutFn(fn) {
  let ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  const ready = (0, _react.useRef)(false);
  const timeout = (0, _react.useRef)();
  const callback = (0, _react.useRef)(fn);
  const isReady = (0, _react.useCallback)(() => ready.current, []);
  const set = (0, _react.useCallback)(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);
  const clear = (0, _react.useCallback)(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []); // update ref when function changes

  (0, _react.useEffect)(() => {
    callback.current = fn;
  }, [fn]); // set on mount, clear on unmount

  (0, _react.useEffect)(() => {
    set();
    return clear;
  }, [ms]);
  return [isReady, clear, set];
}

function useDebounce(fn) {
  let ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  (0, _react.useEffect)(reset, deps);
  return [isReady, cancel];
}

function sortData(col, asc, dataset) {
  let key = col.key;
  let dataType = typeof dataset[0][key];
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

const CheckBox = _ref => {
  let {
    checked,
    onChecked,
    onUnChecked
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-checkbox"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "form-control"
  }, /*#__PURE__*/_react.default.createElement("input", {
    checked: checked,
    onChange: e => {
      if (e.target.checked) {
        onChecked();
      } else {
        onUnChecked();
      }
    },
    type: "checkbox",
    name: "checkbox"
  })));
};

const Cell = _ref2 => {
  let {
    children: value,
    rowHeight,
    format,
    justify,
    item
  } = _ref2;
  const overflowRef = useOverflowAction(ref => {
    (0, _tippy.default)(ref.current, {
      animation: "scale",
      placement: "top-start"
    });
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

  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "ezrt-row--cell"
  }, tipOptions, {
    ref: overflowRef,
    style: {
      height: rowHeight,
      padding: "0 5px",
      display: "flex",
      alignItems: "center",
      justifyContent: justify
    }
  }), format(value, item));
};

const Header = _ref3 => {
  let {
    rowHeight,
    idx,
    children: value,
    onMouseDownHandler,
    addRef,
    active,
    handleSortSelect,
    sort: Sort
  } = _ref3;
  const headerRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    addRef(headerRef);
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: headerRef,
    onClick: handleSortSelect,
    style: {
      height: rowHeight,
      display: "flex",
      justifyContent: "space-between",
      padding: "0 5px",
      position: "relative",
      cursor: "pointer"
    },
    className: "ezr-headers--cell"
  }, /*#__PURE__*/_react.default.createElement("span", null, value), /*#__PURE__*/_react.default.createElement(Sort, null), /*#__PURE__*/_react.default.createElement("span", {
    onMouseDown: onMouseDownHandler,
    className: "resize-handle ".concat(active ? "active" : "idle"),
    style: {
      width: "2px",
      height: "100%",
      position: "relative",
      zIndex: "100"
    }
  }));
};

function EzReactTable(_ref4) {
  let {
    cols,
    data,
    rowHeight = 30,
    showCols = 3,
    tableHeight = 500,
    toolbar: Toolbar,
    selectable = null,
    title
  } = _ref4;
  const defaultGridTemplateColumn = selectable ? "50px repeat(".concat(showCols, ", minmax(60px, 1fr))") : "repeat(".concat(showCols, ", minmax(60px, 1fr))");
  const parentRef = (0, _react.useRef)();
  const inputRef = (0, _react.useRef)();
  const windowRef = (0, _react.useRef)();
  const [selected, setSelected] = (0, _react.useState)([]);
  const [query, setQuery] = (0, _react.useState)("");
  const [_sort, setSort] = (0, _react.useState)(null);
  const [dataset, setDataset] = (0, _react.useState)(data);
  const [defaultColWidth, setDefaultColWidth] = (0, _react.useState)(0);
  const [startIndex, setStartIndex] = (0, _react.useState)(0);
  const [activeIndex, setActiveIndex] = (0, _react.useState)(null);
  const [gridTemplateColumns, setGridTemplateColumns] = (0, _react.useState)(defaultGridTemplateColumn);
  const refs = (0, _react.useRef)(Array.from(Array(showCols)));
  (0, _react.useEffect)(() => {
    if (!parentRef.current) {
      return setDefaultColWidth;
    }

    if (defaultColWidth === 0) {
      setDefaultColWidth(parentRef.current.getBoundingClientRect().width / showCols);
    }
  }, [parentRef]);
  (0, _react.useEffect)(() => {
    if (query) {
      let datum = data.filter(d => JSON.stringify(d).includes(query));
      setDataset(datum.length ? datum : []);
    } else {
      setDataset(data);
    }
  }, [data]);
  useDebounce(() => {
    if (query) {
      let datum = data.filter(d => JSON.stringify(d).includes(query));
      setDataset(datum.length ? datum : []);
    } else {
      setDataset(data);
    }
  }, 500, [query]);

  const _handleSortSelect = idx => {
    if (_sort && _sort[0] === idx) {
      let dir = _sort[1] === 1 ? 2 : null;

      if (!dir) {
        return setSort(null);
      }

      return setSort([idx, dir]);
    }

    return setSort([idx, 1]);
  };

  const mouseDown = index => {
    setActiveIndex(index);
  };

  const mouseMove = (0, _react.useCallback)(e => {
    const gridColumns = refs.current.map((col, i) => {
      if (i === activeIndex) {
        // Calculate the column width
        const width = e.clientX - col.current.offsetLeft;

        if (width < col.current.children[0].offsetWidth + 30) {
          return "".concat(col.current.children[0].offsetWidth + 30, "px");
        }

        return "".concat(width, "px");
      }

      return "".concat(col.current.offsetWidth, "px");
    });
    let checkCol = selectable ? "50px " : "";
    setGridTemplateColumns("".concat(checkCol).concat(gridColumns.join(" "))); //   parentRef.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
  }, [activeIndex]);
  const removeListeners = (0, _react.useCallback)(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);
  const mouseUp = (0, _react.useCallback)(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);
  (0, _react.useEffect)(() => {
    if (activeIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]); // selection

  const selectAll = () => {
    setSelected(dataset.map(d => d[selectable]));
  };

  const unSelectAll = () => {
    setSelected([]);
  };

  const selectOne = idx => {
    setSelected([...selected, idx]);
  };

  const unselectOne = idx => {
    setSelected(selected.filter(s => s !== idx));
  }; //column pagination


  const prevColumn = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
      setGridTemplateColumns(defaultGridTemplateColumn);
    }
  };

  const nextColumn = () => {
    if (cols.slice(startIndex + 1, startIndex + 1 + showCols).length === showCols) {
      setGridTemplateColumns(defaultGridTemplateColumn);
      setStartIndex(startIndex + 1);
    }
  };

  const resetColumn = () => {
    setGridTemplateColumns(defaultGridTemplateColumn);
    setStartIndex(0);
    setSort(null);
  };

  let activeCols = (0, _react.useMemo)(() => {
    return cols.slice(startIndex, startIndex + showCols);
  }, [startIndex]);
  let sorted = (0, _react.useMemo)(() => {
    try {
      if (_sort) {
        return sortData(cols[_sort[0]], _sort[1], dataset);
      } else {
        return dataset;
      }
    } catch (e) {
      return dataset;
    }
  }, [_sort, dataset]);
  let selectedItems = (0, _react.useMemo)(() => {
    return data.filter(d => selected.includes(d[selectable]));
  }, [selected]);
  let Title = (0, _react.useMemo)(() => {
    return typeof title === "function" ? title() : title;
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-head"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-head--banner"
  }, Title), /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-head--options"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-head--search"
  }, /*#__PURE__*/_react.default.createElement("input", {
    ref: inputRef,
    value: query,
    onChange: e => setQuery(e.target.value)
  }), query && /*#__PURE__*/_react.default.createElement("span", {
    onClick: () => {
      setQuery("");
      inputRef.current.focus();
    },
    className: "ezrt-head--search-x"
  }, "\u2715")), /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-head--tools"
  }, /*#__PURE__*/_react.default.createElement(Toolbar, {
    selected: selectedItems,
    clearSelected: unSelectAll
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-headers"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-headers--select"
  }, showCols < cols.length && /*#__PURE__*/_react.default.createElement("span", {
    onClick: prevColumn
  }, /*#__PURE__*/_react.default.createElement(_leftArrow.ReactComponent, {
    fill: "#d3d3d3",
    height: "10px"
  })), /*#__PURE__*/_react.default.createElement("span", {
    onClick: resetColumn
  }, /*#__PURE__*/_react.default.createElement(_reset.ReactComponent, {
    fill: "#d3d3d3",
    height: "10px"
  })), showCols < cols.length && /*#__PURE__*/_react.default.createElement("span", {
    onClick: nextColumn
  }, /*#__PURE__*/_react.default.createElement(_rightArrow.ReactComponent, {
    fill: "#d3d3d3",
    height: "10px"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-headers--row",
    ref: parentRef,
    style: {
      display: "grid",
      gridTemplateColumns
    }
  }, selectable && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: rowHeight,
      display: "flex",
      justifyContent: "center",
      padding: "0 5px"
    },
    className: "ezr-headers--cell"
  }, /*#__PURE__*/_react.default.createElement(CheckBox, {
    checked: selected.length === 0 ? false : !query ? selected.length === data.length : selected.length === dataset.length,
    onChecked: selectAll,
    onUnChecked: unSelectAll
  })), activeCols.map((c, idx) => {
    return /*#__PURE__*/_react.default.createElement(Header, {
      idx: idx,
      key: idx,
      addRef: ref => {
        refs.current[idx] = ref;
      },
      sort: () => _sort && idx === _sort[0] ? /*#__PURE__*/_react.default.createElement(_sort2.ReactComponent, {
        style: {
          position: "absolute",
          right: "5px",
          transform: "rotate(".concat(_sort[1] === 1 ? "180" : "0", "deg)")
        },
        height: "12px",
        fill: "#d3d3d3"
      }) : null,
      handleSortSelect: () => _handleSortSelect(idx),
      onMouseDownHandler: () => mouseDown(idx),
      rowHeight: rowHeight,
      active: activeIndex === idx
    }, c.title);
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-rows"
  }, /*#__PURE__*/_react.default.createElement(_simplebarReact.default, {
    style: {
      height: tableHeight
    }
  }, _ref5 => {
    let {
      scrollableNodeRef,
      contentNodeRef
    } = _ref5;
    return /*#__PURE__*/_react.default.createElement(_reactWindow.FixedSizeList, {
      ref: windowRef,
      className: "eztr-rows--virtual",
      innerRef: contentNodeRef,
      outerRef: scrollableNodeRef,
      height: tableHeight,
      width: "100%",
      onItemsRendered: _ref6 => {// All index params are numbers.
        // searchInputProps.value === ""
        // if (
        //   visibleStopIndex === data.length - 1 &&
        //   infiniteLoader &&
        //   !load
        // ) {
        //   infiniteLoader(visibleStopIndex);
        // setLoad(true);
        // }

        let {
          overscanStartIndex,
          overscanStopIndex,
          visibleStartIndex,
          visibleStopIndex
        } = _ref6;
      },
      itemCount: sorted.length,
      itemSize: rowHeight
    }, _ref7 => {
      let {
        index,
        style
      } = _ref7;
      const item = sorted[index];
      return /*#__PURE__*/_react.default.createElement("div", {
        style: _objectSpread(_objectSpread({}, style), {}, {
          display: "grid",
          gridTemplateColumns
        }),
        key: index,
        className: "ezrt-row"
      }, selectable && /*#__PURE__*/_react.default.createElement("div", {
        className: "ezrt-row--cell",
        style: {
          height: rowHeight,
          padding: "0 5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }, /*#__PURE__*/_react.default.createElement(CheckBox, {
        checked: selected.includes(item[selectable]),
        onChecked: () => selectOne(item[selectable]),
        onUnChecked: () => unselectOne(item[selectable])
      })), activeCols.map((col, idx) => {
        return /*#__PURE__*/_react.default.createElement(Cell, {
          key: idx,
          rowHeight: rowHeight,
          format: col === null || col === void 0 ? void 0 : col.format,
          item: item,
          justify: (col === null || col === void 0 ? void 0 : col.align) || "flex-start"
        }, item[col.key]);
      }));
    });
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ezrt-count"
  }, selectable && selected.length ? "".concat(selected.length, " items selected out of ").concat(data.length) : "".concat(data.length)))));
}