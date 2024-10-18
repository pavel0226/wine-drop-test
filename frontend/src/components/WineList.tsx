// WineList.tsx
import React from "react";
import { ProductWine } from "../types";
import svgLoading from "../assets/imgs/loading.svg";

interface WineListProps {
  error: string | null;
  loading: boolean;
  wines: ProductWine[];
}

const WineList: React.FC<WineListProps> = ({ error, loading, wines }) => {
  const wineItemClass = (index: number): string => {
    const total_amount = wines.length;
    const topBoundary =
      Math.floor(total_amount * 0.1) < 1 ? 1 : Math.floor(total_amount * 0.1);
    const bottomBoundary =
      Math.ceil(total_amount * 0.9) > total_amount - 1
        ? total_amount - 1
        : Math.ceil(total_amount * 0.9);

    if (index < topBoundary) {
      return "ranking-top";
    } else if (index >= bottomBoundary) {
      return "ranking-bottom";
    } else {
      return "";
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <img className="icon" src={svgLoading} alt="Loading..." />
        <p>Loading...</p>
      </div>
    );
  }

  if (wines.length === 0) {
    return <p>No wines found matching the criteria.</p>;
  }

  return (
    <div>
      {wines.map((wine, index) => (
        <div key={wine.id} className={`wine-item ${wineItemClass(index)}`}>
          <span>{wine.rank}. </span>
          <span>{wine.name} </span>
          <span>{wine.vintage} -</span>
          <span> &pound;{wine.total_revenue?.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default WineList;
