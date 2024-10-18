import React from "react";
import { SortOption } from "../types";

interface SortBarProps {
  sortOptions: SortOption[];
  sort: string;
  setSort: (sort: string) => void;
}

const SortBar: React.FC<SortBarProps> = ({ sortOptions, sort, setSort }) => {
  return (
    <div className="mb-primary">
      {sortOptions.map((option) => (
        <button
          key={option.value} // Use a unique key for each button
          onClick={() => setSort(option.value)}
          className={`btn-toggle ${sort === option.value ? "active" : ""}`}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
};

export default SortBar;
