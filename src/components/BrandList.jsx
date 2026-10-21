export function BrandList({
  brands,
  selectedBrand,
  onSelectBrand,
  isLoading,
  error,
}) {
  if (isLoading) return <p>Загрузка производителей...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!brands.length) return null;

  return (
    <div className="brand-list-container">
      <h2>Выберите производителя:</h2>
      <div className="brand-buttons">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => onSelectBrand(brand)}
            className={`brand-button ${selectedBrand === brand ? "active" : ""}`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}
