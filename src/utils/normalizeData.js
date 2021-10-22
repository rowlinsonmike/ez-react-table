const normalizeData = (cols = [], data = []) => {
  const _data = data.map((d) => {
    const normalizedDataItem = cols.reduce((a, c) => {
      if (c["render"]) {
        a[c["key"]] = c["render"](d[c["key"]], d);
      } else {
        a[c["key"]] = d[c["key"]];
      }
      return a;
    }, {});
    normalizedDataItem.__proto__.data = d;
    return normalizedDataItem;
  });
  return _data;
};

export default normalizeData;
