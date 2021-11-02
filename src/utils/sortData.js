const sortMap = {
  boolean: (data, key, direction) => {
    if (direction === "descend") {
      return data.sort(function (x) {
        return x.__proto__[key] ? -1 : 1;
      });
    } else {
      return data.sort(function (x) {
        return x.__proto__[key] ? 1 : -1;
      });
    }
  },
  string: (data, key, direction) => {
    if (direction === "descend") {
      return data.sort(function (a, b) {
        if (b.__proto__[key] > a.__proto__[key]) {
          return -1;
        }
        if (a.__proto__[key] > b.__proto__[key]) {
          return 1;
        }
        return 0;
      });
    } else {
      return data.sort(function (a, b) {
        if (a.__proto__[key] > b.__proto__[key]) {
          return -1;
        }
        if (b.__proto__[key] > a.__proto__[key]) {
          return 1;
        }
        return 0;
      });
    }
  },

  number: (data, key, direction) => {
    if (direction === "descend") {
      return data.sort(function (a, b) {
        return b.__proto__[key] - a.__proto__[key];
      });
    } else {
      return data.sort(function (a, b) {
        return a.__proto__[key] - b.__proto__[key];
      });
    }
  },
};

const sortData = (data, sort, setSort) => {
  if (!sort || !data?.length) {
    return data;
  }
  let [key, direction] = sort;
  if (sortMap[typeof data[0].__proto__[key]]) {
    return sortMap[typeof data[0].__proto__[key]](data, key, direction);
  } else {
    //reset sort if column is not sortable
    setSort(null);
    return data;
  }
};

export default sortData;
