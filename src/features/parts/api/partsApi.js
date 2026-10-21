// api/partsApi.js

function getGoods(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.goods)) return data.goods;
  return [];
}

/**
 * Выполняет запрос к API.
 * @param {Object} params - Параметры поиска.
 * @param {string} params.number - Номер детали.
 * @param {string} [params.brand] - Бренд (опционально).
 * @param {AbortSignal} [signal] - Сигнал отмены.
 */
export async function requestParts({ number, brand }, { signal } = {}) {
  const params = new URLSearchParams({ number });
  if (brand) params.set("brand", brand);

  try {
    const response = await fetch(`/api/search?${params}`, { signal });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(text || `HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (data?.error) {
      throw new Error(data.error);
    }

    return getGoods(data);
  } catch (error) {
    if (error.name === "AbortError") throw error;

    throw new Error(error.message || "Ошибка сети. Проверьте подключение.");
  }
}
