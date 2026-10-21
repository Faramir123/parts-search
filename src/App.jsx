import { useDispatch, useSelector } from "react-redux";

import {
  setNumber,
  selectBrand,
  clearSearch,
  fetchBrands,
  fetchOffers,
} from "./features/parts";
import { OffersTable } from "./components/OffersTable";
import { BrandList } from "./components/BrandList";
import { SearchForm } from "./components/SearchForm";

export default function App() {
  const dispatch = useDispatch();

  const {
    number,
    brands,
    selectedBrand,
    offers,
    brandsStatus,
    offersStatus,
    brandsError,
    offersError,
  } = useSelector((state) => state.parts);

  // Обработчики
  const handleSearch = (searchNumber) => {
    dispatch(setNumber(searchNumber));
    dispatch(fetchBrands(searchNumber));
  };

  const handleSelectBrand = (brand) => {
    if (brand === selectedBrand) return;
    dispatch(selectBrand(brand));
    dispatch(fetchOffers({ number, brand }));
  };

  const handleReset = () => {
    dispatch(clearSearch());
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Поиск автозапчастей</h1>
      </header>

      <main>
        <SearchForm
          onSearch={handleSearch}
          onReset={handleReset}
          isLoading={brandsStatus === "loading"}
          hasActiveSearch={!!number}
        />

        <BrandList
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={handleSelectBrand}
          isLoading={brandsStatus === "loading"}
          error={brandsError}
        />

        <OffersTable
          offers={offers}
          selectedBrand={selectedBrand}
          isLoading={offersStatus === "loading"}
          error={offersError}
        />
      </main>
    </div>
  );
}
