import { useState } from "react";

export function SearchForm({ onSearch, onReset, isLoading, hasActiveSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  const handleReset = () => {
    setInputValue("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите номер детали (например, 0986479R58)"
        className="search-input"
      />
      <button type="submit" disabled={isLoading} className="search-button">
        {isLoading ? "Поиск..." : "Найти"}
      </button>
      {hasActiveSearch && (
        <button type="button" onClick={handleReset} className="reset-button">
          Сбросить
        </button>
      )}
    </form>
  );
}
