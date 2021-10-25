import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import StyledList from "./assets/styles/StyledList";
import Styles from "./assets/styles/style";

import useSearchAction from "./assets/hooks/useSearchAction";
import sortData from "./utils/sortData";
import { ReactComponent as SearchSvg } from "./assets/svg/search.svg";
import { ReactComponent as EraserSvg } from "./assets/svg/eraser.svg";

import Sort from "./components/Sort";
import RowCell from "./components/RowCell";
import Refresh from "./components/Refresh";
import Title from "./components/Title";
const EzReactTable = ({
  data,
  cols,
  rowHeight,
  tableHeight,
  update,
  infiniteLoad,
  defaultSort,
  accentColor,
  darkMode,
  title,
}) => {
  const [searchInputProps, _data] = useSearchAction(cols, data);
  const [sort, setSort] = useState(
    defaultSort ? [defaultSort, "descend"] : null
  );
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(false);
  }, [data]);
  let _dataset = sortData(_data, sort, setSort);
  return (
    <>
      <Styles
        config={{
          tableWidth: cols.reduce((a, c) => a + c.width, 0) + 50,
          accentColor,
          darkMode,
        }}
      />
      <div className="ezr-table">
        <Title title={title} />
        <div className="ezr-header">
          <div className="ezr-header-left">
            <div className="ezr-search">
              <input
                {...searchInputProps}
                className="ezr-search-input"
                type="text"
              />
              <button
                onClick={() => {
                  if (searchInputProps.value.length) {
                    searchInputProps.onChange({ target: { value: "" } });
                  }
                }}
              >
                {searchInputProps.value.length ? (
                  <EraserSvg
                    className="ezr-search-icon"
                    style={{ transform: "scale(70%)" }}
                  />
                ) : (
                  <SearchSvg
                    className="ezr-search-icon"
                    style={{ transform: "scale(70%)" }}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="ezr-header-right">
            <Refresh data={data} update={update} />
          </div>
        </div>
        <div className="ezr-body">
          <div className="ezr-col-header">
            {cols.map((c, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    height: `${rowHeight}px`,
                    width: `${c.width}px`,
                  }}
                  className="ezr-col-header-cell"
                  onClick={() => {
                    if (sort && sort[0] === c.key) {
                      setSort([
                        c.key,
                        sort[1] === "descend" ? "ascend" : "descend",
                      ]);
                    } else {
                      setSort([c.key, "descend"]);
                    }
                  }}
                >
                  <span
                    style={{
                      ...(c.center
                        ? { width: "100%", textAlign: "center" }
                        : {}),
                    }}
                  >
                    {c.title}
                  </span>
                  <Sort
                    direction={sort && sort[0] === c.key ? sort[1] : null}
                  />
                </div>
              );
            })}
          </div>
          <div className="ezr-rows">
            <SimpleBar style={{ height: `${tableHeight}px` }}>
              {({ scrollableNodeRef, contentNodeRef }) => {
                return (
                  <StyledList
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
                      if (
                        visibleStopIndex === _data.length - 1 &&
                        !load &&
                        infiniteLoad &&
                        searchInputProps.value === ""
                      ) {
                        infiniteLoad(visibleStopIndex);
                        setLoad(true);
                      }
                    }}
                    itemCount={_dataset.length}
                    itemSize={rowHeight}
                  >
                    {({ index, style }) => {
                      const item = _dataset[index];
                      return (
                        <div
                          style={{ ...style }}
                          key={index}
                          className="ezr-row"
                        >
                          {Object.keys(item).map((k, idx) => {
                            let textAlign = cols[idx]?.center
                              ? "center"
                              : "initial";
                            return (
                              <RowCell
                                key={idx}
                                style={{
                                  textAlign,
                                  width: `${cols[idx].width}px`,
                                }}
                                value={item[k]}
                              />
                            );
                          })}
                        </div>
                      );
                    }}
                  </StyledList>
                );
              }}
            </SimpleBar>
          </div>
        </div>
        <div className="ezr-footer">
          <span>{_dataset.length}</span>
          <span>items</span>
        </div>
      </div>
    </>
  );
};

EzReactTable.defaultProps = {
  cols: [],
  data: [],
  rowHeight: 50,
  tableHeight: 300,
  update: null,
  infiniteLoad: null,
  defaultSort: null,
  accentColor: "#b8b8b8",
  darkMode: false,
  title: null,
};

EzReactTable.propTypes = {
  cols: PropTypes.array,
  data: PropTypes.array,
  rowHeight: PropTypes.number,
  tableHeight: PropTypes.number,
  update: PropTypes.func,
  infiniteLoad: PropTypes.func,
  defaultSort: PropTypes.string,
  accentColor: PropTypes.string,
  darkMode: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default EzReactTable;
