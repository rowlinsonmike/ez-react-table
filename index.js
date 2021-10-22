import React, { useState, useEffect, useMemo, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import styled from "styled-components";
import EmptyImage from "./assets/empty.png";
import Loader from "./components/Loader/Loader";

// '########:'####:'########::'########::'##:::'##:
// ... ##..::. ##:: ##.... ##: ##.... ##:. ##:'##::
// ::: ##::::: ##:: ##:::: ##: ##:::: ##::. ####:::
// ::: ##::::: ##:: ########:: ########::::. ##::::
// ::: ##::::: ##:: ##.....::: ##.....:::::: ##::::
// ::: ##::::: ##:: ##:::::::: ##::::::::::: ##::::
// ::: ##::::'####: ##:::::::: ##::::::::::: ##::::
// :::..:::::....::..:::::::::..::::::::::::..:::::

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import "tippy.js/animations/scale.css";

// :'######::'##::::'##::'######:::
// '##... ##: ##:::: ##:'##... ##::
//  ##:::..:: ##:::: ##: ##:::..:::
// . ######:: ##:::: ##: ##::'####:
// :..... ##:. ##:: ##:: ##::: ##::
// '##::: ##::. ## ##::: ##::: ##::
// . ######::::. ###::::. ######:::
// :......::::::...::::::......::::
import { ReactComponent as SearchSvg } from "./assets/search.svg";
import { ReactComponent as EraseSvg } from "./assets/eraser.svg";
import { ReactComponent as SortUpSvg } from "./assets/sort-up.svg";
import { ReactComponent as SortDownSvg } from "./assets/sort-down.svg";

export const Toolbar = styled.div`
  display: flex;
  & > * + * {
    margin-left: 6px;
  }
`;

const ListContainer = styled.div`
  position: relative;
`;
const Row = styled.div`
  ${({ header }) =>
    !header
      ? `
    &:hover {
      background: rgba(219, 219, 219, 50%);
      border-radius: 7px;
      padding-left: 5px;
    }
    `
      : `
      border-bottom: "1px solid #dedede";
      line-height: 2rem;
      font-weight: "bold";
      margin-bottom: "10px";
      user-select: none;
    `}
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: 0.3s;
  & > * + * {
    margin-left: 1rem;
  }
`;
const Count = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
`;
const Cell = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ center }) =>
    center &&
    `
display: flex;
justify-content: center;
align-items: center;
`}
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  /* .image {
    width: 300px;
    height: 300px;
    background: url(${({ EmptyImage }) => EmptyImage}) no-repeat;
    background-size: 300px;
    overflow: hidden;
  } */
`;

const Input = styled.div`
  border-radius: 7px;
  position: relative;
  width: 300px;
  overflow: hidden;
  line-height: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  input {
    width: 260px;
    border: none;
    outline: none;
    height: 100%;
    padding-left: 10px;
  }
  i {
    cursor: pointer;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    position: absolute;
    width: 30px;
    line-height: 2rem;
  }
`;

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const useSearch = (fields, data) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(data);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  function find(items, text) {
    text = text.toLowerCase().split(" ");
    return items.filter((item) => {
      return text.every((el) => {
        return fields.some((field) => {
          return String(item[field]).toLowerCase().indexOf(el) > -1;
        });
      });
    });
  }
  useEffect(() => setResults(data), [data]);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setResults(find(data, debouncedSearchTerm));
      } else {
        setResults(data);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  if (!fields) {
    return [() => null, data];
  }
  return [
    { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) },
    results,
  ];
};

function checkOverflow(el) {
  var curOverflow = el.style.overflow;

  if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";

  var isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

  el.style.overflow = curOverflow;

  return isOverflowing;
}
const ChildCell = ({ children, value, ...rest }) => {
  const ref = useRef();
  useEffect(() => {
    if (checkOverflow(ref.current)) {
      tippy(ref.current, {
        animation: "scale",
        placement: "top-start",
      });
    }
  }, [ref]);
  return (
    <Cell ref={ref} data-tippy-content={value} {...rest}>
      {children}
    </Cell>
  );
};
export default function ({
  height = 150,
  rowHeight = 30,
  columns = [],
  data = [],
  defaultSort = null,
  searchFields = null,
  loading = false,
  emptyImage = EmptyImage,
}) {
  const [descend, setDescend] = useState(true);
  const [sort, setSort] = useState(defaultSort);

  const [searchProps, indexedData] = useSearch(searchFields, data);

  const toggleSort = (newSort) => {
    if (newSort !== sort) {
      setSort(newSort);
    }
    setDescend(newSort === sort ? !descend : true);
  };
  const sortData = () => {
    if (!sort || !indexedData || !indexedData.length) {
      return indexedData;
    }
    const sortMap = {
      string: () => {
        if (descend) {
          return indexedData.sort(function (a, b) {
            if (b[sort] > a[sort]) {
              return -1;
            }
            if (a[sort] > b[sort]) {
              return 1;
            }
            return 0;
          });
        } else {
          return indexedData.sort(function (a, b) {
            if (a[sort] > b[sort]) {
              return -1;
            }
            if (b[sort] > a[sort]) {
              return 1;
            }
            return 0;
          });
        }
      },
      number: () => {
        if (descend) {
          return indexedData.sort(function (a, b) {
            return b[sort] - a[sort];
          });
        } else {
          return indexedData.sort(function (a, b) {
            return a[sort] - b[sort];
          });
        }
      },
    };
    if (sortMap[typeof indexedData[0][sort]]) {
      return sortMap[typeof indexedData[0][sort]]();
    } else {
      //reset sort if column is not sortable
      setSort(null);
      return indexedData;
    }
  };
  const sorted = sortData();
  let renderItem = ({ index, style }) => {
    const cellRender = (column, value, idx) => {
      if (column?.render) {
        return column.render(value);
      }
      if (typeof value !== "function") {
        return value;
      } else {
        let Component = value;
        return <Component />;
      }
    };
    return (
      <Row style={{ ...style }} key={index}>
        {columns.map((column, idx) => {
          let value = sorted[index][column.key];
          return (
            <ChildCell
              center={column?.center}
              key={idx}
              style={{ width: column.width }}
              value={value}
            >
              {cellRender(column, value, idx)}
            </ChildCell>
          );
        })}
      </Row>
    );
  };
  return (
    <ListContainer>
      {searchFields && (
        <Input>
          <input {...searchProps} placeholder="Search..." />
          {searchProps.value.length ? (
            <EraseSvg
              onClick={() =>
                searchProps.value.length &&
                searchProps.onChange({ target: { value: "" } })
              }
            />
          ) : (
            <SearchSvg />
          )}
        </Input>
      )}
      <Count>{indexedData.length} count</Count>
      <Row
        header
        style={{
          borderBottom: "1px solid #dedede",
          fontWeight: "bold",
          display: "flex",
          marginBottom: "10px",
        }}
      >
        {columns.map((column, idx) => (
          <Cell
            center={column?.center}
            className="cell"
            onClick={() => toggleSort(column.key)}
            style={{ cursor: "pointer", width: column.width }}
            key={idx}
          >
            <span style={{ paddingRight: "5px" }}>{column.title}</span>
            {column.key === sort &&
              (descend ? (
                <SortDownSvg height="15px" />
              ) : (
                <SortUpSvg height="15px" />
              ))}
          </Cell>
        ))}
      </Row>
      {loading && (
        <Empty EmptyImage={emptyImage}>
          <Loader />
        </Empty>
      )}
      {!loading && (
        <List
          height={height}
          width="100%"
          itemCount={indexedData.length}
          itemSize={rowHeight}
        >
          {renderItem}
        </List>
      )}
    </ListContainer>
  );
}

// const Container = styled.div`
//   transition: 0.3s;
// `;
// const Row = styled.div`
//   ${({ header }) =>
//     !header
//       ? `
//     &:hover {
//       background: rgba(219, 219, 219, 50%);
//       border-radius: 7px;
//       padding: 5px;
//     }
//     `
//       : `
//       border-bottom: "1px solid #dedede";
//       font-weight: "bold";
//       margin-bottom: "10px";
//     `}
//   display: flex;
//   cursor: pointer;
//   align-items: center;
//   transition: 0.3s;
// `;

// const Cell = styled.div`
//   ${({ center }) =>
//     center &&
//     `
// display: flex;
// justify-content: center;
// align-items: center;
// `}
// `;

// const Empty = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   .image {
//     width: 300px;
//     height: 300px;
//     background: url(${({ EmptyImage }) => EmptyImage}) no-repeat;
//     background-size: 300px;
//     overflow: hidden;
//   }
// `;
// const LoadContainer = styled.div`
//   ${({ height }) => `height: ${height};`}
//   display: flex;
//   margin: 100px 0;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 100%;
// `;

// const Input = styled.div`
//   border-radius: 7px;
//   position: relative;
//   width: 300px;
//   overflow: hidden;
//   line-height: 2rem;
//   margin-bottom: 1.5rem;
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
//     rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
//   input {
//     width: 260px;
//     border: none;
//     outline: none;
//     height: 100%;
//     padding-left: 10px;
//   }
//   i {
//     cursor: pointer;
//     top: 0;
//     bottom: 0;
//     right: 0;
//     height: 100%;
//     position: absolute;
//     width: 30px;
//     line-height: 2rem;
//   }
// `;

// const ListElement = styled(List)``;

// function useDebounce(value, delay) {
//   // State and setters for debounced value
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(
//     () => {
//       // Update debounced value after delay
//       const handler = setTimeout(() => {
//         setDebouncedValue(value);
//       }, delay);
//       // Cancel the timeout if value changes (also on delay change or unmount)
//       // This is how we prevent debounced value from updating if value is changed ...
//       // .. within the delay period. Timeout gets cleared and restarted.
//       return () => {
//         clearTimeout(handler);
//       };
//     },
//     [value, delay] // Only re-call effect if value or delay changes
//   );
//   return debouncedValue;
// }

// const useSearch = (fields, data) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState(data);
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);
//   function find(items, text) {
//     text = text.toLowerCase().split(" ");
//     return items.filter((item) => {
//       return text.every((el) => {
//         return fields.some((field) => {
//           return String(item[field]).toLowerCase().indexOf(el) > -1;
//         });
//       });
//     });
//   }

//   useEffect(() => setResults(data), [data]);
//   useEffect(
//     () => {
//       if (debouncedSearchTerm) {
//         setResults(find(data, debouncedSearchTerm));
//       } else {
//         setResults(data);
//       }
//     },
//     [debouncedSearchTerm] // Only call effect if debounced search term changes
//   );
//   if (!fields) {
//     return [() => null, data];
//   }
//   return [
//     { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) },
//     results,
//   ];
// };

// function checkOverflow(el) {
//   var curOverflow = el.style.overflow;

//   if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";

//   var isOverflowing =
//     el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

//   el.style.overflow = curOverflow;

//   return isOverflowing;
// }

// const ChildCell = ({ children, value, ...rest }) => {
//   const ref = useRef();
//   useEffect(() => {
//     if (checkOverflow(ref.current)) {
//       tippy(ref.current, {
//         animation: "scale",
//         placement: "top-start",
//       });
//     }
//   }, [ref]);
//   return (
//     <Cell ref={ref} data-tippy-content={value} {...rest}>
//       {children}
//     </Cell>
//   );
// };

// // '########:'##::::'##:'########:::'#######::'########::'########:
// //  ##.....::. ##::'##:: ##.... ##:'##.... ##: ##.... ##:... ##..::
// //  ##::::::::. ##'##::: ##:::: ##: ##:::: ##: ##:::: ##:::: ##::::
// //  ######:::::. ###:::: ########:: ##:::: ##: ########::::: ##::::
// //  ##...:::::: ## ##::: ##.....::: ##:::: ##: ##.. ##:::::: ##::::
// //  ##:::::::: ##:. ##:: ##:::::::: ##:::: ##: ##::. ##::::: ##::::
// //  ########: ##:::. ##: ##::::::::. #######:: ##:::. ##:::: ##::::
// // ........::..:::::..::..::::::::::.......:::..:::::..:::::..:::::
// export default function ({
//   height = 150,
//   rowHeight = 30,
//   columns = [],
//   data = [],
//   defaultSort = null,
//   searchFields = null,
//   emptyImage = EmptyImage,
//   loading = false,
// }) {
//   const [descend, setDescend] = useState(true);
//   const [sort, setSort] = useState(defaultSort);
//   const [_loading, setLoading] = useState(true);
//   const [searchProps, indexedData] = useSearch(searchFields, data);
//   const [loaderClass, setLoaderClass] = useState("");
//   useEffect(() => {
//     setLoaderClass("loading");
//     setTimeout(() => {
//       setLoading(loading);
//     }, 1500);
//   }, [loading]);
//   const toggleSort = (newSort) => {
//     if (newSort !== sort) {
//       setSort(newSort);
//     }
//     setDescend(newSort === sort ? !descend : true);
//   };
//   const sortData = () => {
//     if (!sort || !indexedData || !indexedData.length) {
//       return indexedData;
//     }
//     const sortMap = {
//       string: () => {
//         if (descend) {
//           return indexedData.sort(function (a, b) {
//             if (b[sort] > a[sort]) {
//               return -1;
//             }
//             if (a[sort] > b[sort]) {
//               return 1;
//             }
//             return 0;
//           });
//         } else {
//           return indexedData.sort(function (a, b) {
//             if (a[sort] > b[sort]) {
//               return -1;
//             }
//             if (b[sort] > a[sort]) {
//               return 1;
//             }
//             return 0;
//           });
//         }
//       },
//       number: () => {
//         if (descend) {
//           return indexedData.sort(function (a, b) {
//             return b[sort] - a[sort];
//           });
//         } else {
//           return indexedData.sort(function (a, b) {
//             return a[sort] - b[sort];
//           });
//         }
//       },
//     };
//     if (sortMap[typeof indexedData[0][sort]]) {
//       return sortMap[typeof indexedData[0][sort]]();
//     } else {
//       //reset sort if column is not sortable
//       setSort(null);
//       return indexedData;
//     }
//   };
//   const sorted = sortData();

//   let renderItem = ({ index, style }) => {
//     const cellRender = (column, value, idx) => {
//       if (column?.render) {
//         return column.render(value);
//       }
//       if (typeof value !== "function") {
//         return value;
//       } else {
//         let Component = value;
//         return <Component />;
//       }
//     };
//     return (
//       <Row style={{ ...style }} key={index}>
//         {columns.map((column, idx) => {
//           let value = sorted[index][column.key];
//           return (
//             <ChildCell
//               center={column?.center}
//               key={idx}
//               style={{ width: column.width }}
//             >
//               {cellRender(column, value, idx)}
//             </ChildCell>
//           );
//         })}
//       </Row>
//     );
//   };
//   return (
//     <Container>
//       {searchFields && (
//         <Input>
//           <input {...searchProps} placeholder="Search..." />
//           {/* <Icon
//             onClick={() =>
//               searchProps.value.length &&
//               searchProps.onChange({ target: { value: "" } })
//             }
//             icon={searchProps.value.length ? "times-circle-o" : "search"}
//           /> */}
//           <i
//             onClick={() =>
//               searchProps.value.length &&
//               searchProps.onChange({ target: { value: "" } })
//             }
//           >
//             {searchProps.value.length ? "✕" : ">"}
//           </i>
//         </Input>
//       )}
//       <Row
//         header
//         style={{
//           borderBottom: "1px solid #dedede",
//           fontWeight: "bold",
//           display: "flex",
//           marginBottom: "10px",
//         }}
//       >
//         {columns.map((column, idx) => (
//           <Cell
//             center={column?.center}
//             className="cell"
//             onClick={() => toggleSort(column.key)}
//             style={{ cursor: "pointer", width: column.width }}
//             key={idx}
//           >
//             <span style={{ paddingRight: "5px" }}>{column.title}</span>
//             {column.key === sort && <i>{descend ? "˅" : "^"}</i>}
//           </Cell>
//         ))}
//       </Row>
//       {_loading ? (
//         <LoadContainer height={height} loadClass={loaderClass}>
//           <Loader />
//         </LoadContainer>
//       ) : !data.length ? (
//         <Empty EmptyImage={emptyImage}>
//           <div className="image"></div>
//         </Empty>
//       ) : (
//         <ListElement
//           height={height}
//           width="100%"
//           itemCount={indexedData.length}
//           itemSize={rowHeight}
//         >
//           {renderItem}
//         </ListElement>
//       )}
//     </Container>
//   );
// }

{
  /* <List
height={400}
rowHeight={50}
defaultSort="name"
searchFields={["name"]}
loading={loading}
columns={[
  { title: "User", width: 400, key: "username" },
  { title: "Actions", width: 200, key: "actions" },
]}
data={users.map((u) => ({
  ...u,
  actions: (
    <>
      {u.username === "admin" ? null : (
        <Button
          circle
          type="danger"
          onClick={() => deleteUser(u.username)}
        >
          <i className="las la-trash-alt" />
        </Button>
      )}
    </>
  ),
}))}
/> */
}
