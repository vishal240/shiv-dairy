import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <span className="table_search">
      <input
        type="text"
        placeholder="Search anything"
        className=""
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </span>
  );
};

export default Search;
