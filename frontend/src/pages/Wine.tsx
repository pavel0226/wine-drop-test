import { useEffect, useState } from "react";

import { fetchWines } from "../services/wines";
import { ProductWine, SortOption } from "../types";

import SortBar from "../components/SortBar";
import SearchBar from "../components/SearchBar";
import WineList from "../components/WineList";

const PageWine: React.FC = () => {
  const [sort, setSort] = useState("revenue");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [wines, setWines] = useState<ProductWine[]>([]);

  const sortOptions: SortOption[] = [
    { value: "revenue", title: "By revenue" },
    { value: "sold", title: "By # bottles sold" },
    { value: "orders", title: "By # orders" },
  ];

  useEffect(() => {
    const updateWines = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchWines(sort, query);
        setWines(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setWines([]);
      }
      setLoading(false);
    };

    updateWines();
  }, [sort, query]);

  return (
    <div className="container">
      {/* heading */}
      <h1 className="headline">Best selling wine</h1>

      {/* Tool bar */}
      <SortBar sortOptions={sortOptions} sort={sort} setSort={setSort} />
      <SearchBar query={query} setQuery={setQuery} />

      {/* wine list */}
      <WineList error={error} loading={loading} wines={wines} />
    </div>
  );
};

export default PageWine;
