const sortMap = {
  string: (data, key, direction) => {
    if (direction === "descend") {
      return data.sort(function (a, b) {
        if (b[key] > a[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      });
    } else {
      return data.sort(function (a, b) {
        if (a[key] > b[key]) {
          return -1;
        }
        if (b[key] > a[key]) {
          return 1;
        }
        return 0;
      });
    }
  },

  number: (data, direction) => {
    if (direction === "descend") {
      return data.sort(function (a, b) {
        return b[sort] - a[sort];
      });
    } else {
      return data.sort(function (a, b) {
        return a[sort] - b[sort];
      });
    }
  },
};

const sortData = (data, sort, setSort) => {
  if (!sort || !data?.length) {
    return data;
  }
  let [key, direction] = sort;
  if (sortMap[typeof data[0][key]]) {
    return sortMap[typeof data[0][key]](data, key, direction);
  } else {
    //reset sort if column is not sortable
    setSort(null);
    return data;
  }
};

export default sortData;
