import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Prompt Vault API is running",
  });
});

export default app;
