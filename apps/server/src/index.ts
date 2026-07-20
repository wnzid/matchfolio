import "dotenv/config";

import cors from "cors";
import express from "express";

const app = express();

const port = Number(process.env.PORT ?? 3001);
const clientOrigin =
  process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

app.use(
  cors({
    origin: clientOrigin,
  }),
);

app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "matchfolio-api",
  });
});

app.listen(port, () => {
  console.log(`Matchfolio API running at http://localhost:${port}`);
});
