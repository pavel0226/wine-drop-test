import { useEffect, useState } from "react";

import { fetchWines } from "./services/wines";
import { ProductWine } from "./types";

import "./App.css";
import iconSearch from "./assets/imgs/icon-search.svg";
import svgLoading from "./assets/imgs/loading.svg";

const App: React.FC = () => {
  const [sort, setSort] = useState('revenue');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [wines, setWines] = useState<ProductWine[]>([]);

  const wineItemClass = (index: number): string => {
    const total_amount = wines.length;
    const topBoundary = Math.floor(total_amount * 0.1) < 1 ? 1 : Math.floor(total_amount * 0.1);
    const bottomBoundary = Math.ceil(total_amount * 0.9) > (total_amount - 1) ? (total_amount - 1) : Math.ceil(total_amount * 0.9);

    if (index < topBoundary) {
      return 'ranking-top';
    } else if (index >= bottomBoundary) {
      return 'ranking-bottom';
    } else {
      return '';
    }
  }

  useEffect(() => {
    const updateWines = async () => {
      setLoading(true);
      setError('');
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
    }

    updateWines();
  }, [sort, query]);

  return (
    <div className="container">
      <h1 className="headline">Best selling wine</h1>
      
      {/* sort option */}
      <div className="mb-primary">
        <button onClick={() => setSort('revenue')} className={`btn-toggle ${sort === 'revenue' ? 'active' : ''}`}>By revenue</button>
        <button onClick={() => setSort('sold')} className={`btn-toggle ${sort === 'sold' ? 'active' : ''}`}>By # bottles sold</button>
        <button onClick={() => setSort('orders')} className={`btn-toggle ${sort === 'orders' ? 'active' : ''}`}>By # orders</button>
      </div>

      {/* search input */}
      <div className="search-container mb-primary">
        <img className="icon" src={iconSearch} alt="search icon" />
        <input className="text-input" value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="search" />
      </div>

      {error && <p>{error}</p>}
      {
        loading && <div className="loading-container">
          <img className="icon" src={svgLoading} />
          <p>Loading...</p>
        </div>
      }

      {/* wine list */}
      {wines && wines.map((wine, index) => {
        return (
          <div key={wine.id} className={`wine-item ${wineItemClass(index)}`}>
            <span>{index + 1}. </span>
            <span>{wine.name} </span>
            <span>{wine.vintage} -</span>
            <span> &pound;{wine.total_revenue?.toFixed(2)}</span>
          </div>
        )
      })}
      {
        !error && !loading && wines.length === 0 && <p>No wines found matching the criteria.</p>
      }
    </div>
  ) 
}

export default App;
