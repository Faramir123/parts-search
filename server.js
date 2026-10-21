import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT || 3001);
const apiKey = process.env.FAVORIT_API_KEY;
const apiUrl = "http://api.favorit-parts.ru/hs/hsprice/";

app.use(cors());
app.use(express.json());

app.get("/api/search", async (req, res) => {
  const number = String(req.query.number || "").trim();
  const brand = String(req.query.brand || "").trim();

  if (!apiKey) {
    return res.status(500).json({
      error: "На сервере не задан FAVORIT_API_KEY.",
    });
  }

  if (!number) {
    return res.status(400).json({
      error: "Укажите артикул детали.",
    });
  }

  const params = new URLSearchParams({
    key: apiKey,
    number,
    info: "on",
  });

  if (brand) {
    params.set("brand", brand);
    params.set("analogues", "on");
  }

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      signal: AbortSignal.timeout(15000),
    });

    const body = await response.text();
    let data;

    try {
      data = JSON.parse(body);
    } catch {
      return res.status(502).json({
        error: "API вернул ответ, который не удалось прочитать как JSON.",
      });
    }

    if (!response.ok) {
      return res.status(502).json({
        error: `API вернул HTTP ${response.status}.`,
      });
    }

    if (data?.error) {
      return res.status(502).json({
        error: Array.isArray(data.error)
          ? data.error.join("; ")
          : String(data.error),
      });
    }

    return res.json(data);
  } catch (error) {
    const timedOut = error?.name === "TimeoutError";

    return res.status(502).json({
      error: timedOut
        ? "Превышено время ожидания ответа API."
        : "Не удалось связаться с API. Проверьте сеть и попробуйте ещё раз.",
    });
  }
});

app.listen(port, () => {
  console.log(`Favorit Parts proxy listening on http://localhost:${port}`);
});
