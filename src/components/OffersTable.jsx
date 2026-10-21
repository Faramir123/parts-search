export function OffersTable({ offers, isLoading, error, selectedBrand }) {
  if (isLoading) return <p>Загрузка предложений...</p>;
  if (error) return <p className="error-message">{error}</p>;

  if (offers.length === 0 && selectedBrand) {
    return <p>По выбранному бренду предложений не найдено.</p>;
  }

  if (!offers.length) return null;

  return (
    <div className="offers-table-container">
      <h2>Предложения:</h2>
      <table className="offers-table">
        <thead>
          <tr>
            <th>Бренд</th>
            <th>Номер</th>
            <th>Название</th>
            <th>Наличие</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr key={offer.id || index}>
              <td>{offer.brand}</td>
              <td>{offer.number}</td>
              <td>{offer.name || "—"}</td>
              <td>{offer.count || 0} шт.</td>
              <td>{offer.price ? `${offer.price} ₽` : "По запросу"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
