import { useEffect, useState } from "react";

const useSort = () => {
  const [descend, setDescend] = useState(true);
  const [sort, setSort] = useState(defaultSort);
  const toggleSort = (newSort) => {
    if (newSort !== sort) {
      setSort(newSort);
    }
    setDescend(newSort === sort ? !descend : true);
  };
  const sortData = (indexedData) => {
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
  return [sortData, sort, descend];
};

export default useSort;
