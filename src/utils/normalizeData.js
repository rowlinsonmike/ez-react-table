const normalizeData = (cols = [], data = []) => {
  const _data = data.map((d) => {
    let normalizedDataItem = Object.create({ ...d });
    cols.forEach((c) => {
      if (c["render"]) {
        normalizedDataItem[c.key] = c.render(d[c.key], d);
      } else {
        normalizedDataItem[c.key] = d[c.key];
      }
    });
    return normalizedDataItem;
  });
  return _data;
};

export default normalizeData;
