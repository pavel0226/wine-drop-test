import React from "react";
import iconSearch from "../assets/imgs/icon-search.svg";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="search-container mb-primary">
      <img className="icon" src={iconSearch} alt="search icon" />
      <input
        className="text-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="search"
      />
    </div>
  );
};

export default SearchBar;
