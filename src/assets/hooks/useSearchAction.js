import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import normalizeData from "../../utils/normalizeData";

const useSearchAction = (fields, data) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(normalizeData(fields, data));
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const _fields = fields.map((f) => f.key);
  console.log(_fields, data);
  function find(items, text) {
    text = text.toLowerCase().split(" ");
    return items.filter((item) => {
      return text.every((el) => {
        return _fields.some((field) => {
          return String(item[field]).toLowerCase().indexOf(el) > -1;
        });
      });
    });
  }
  useEffect(() => setResults(normalizeData(fields, data)), [data]);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setResults(normalizeData(fields, find(data, debouncedSearchTerm)));
      } else {
        setResults(normalizeData(fields, data));
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  if (!_fields) {
    return [() => null, data];
  }
  return [
    { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) },
    results,
  ];
};

export default useSearchAction;
