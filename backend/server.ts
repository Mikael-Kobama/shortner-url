import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL!;
const port = process.env.PORT || 3002;

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortId: String,
});

const UrlModel = mongoose.model("Url", urlSchema);

function generateShortId(length = 6): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "URL Obrigatória" });

  const shortId = generateShortId();
  const baseUrl = `http://localhost:${port}`;
  const shortUrl = `${baseUrl}/${shortId}`;

  await UrlModel.create({ originalUrl, shortId });
  res.json({ shortUrl });
});

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const entry = await UrlModel.findOne({ shortId });
  if (!entry) return res.status(400).send("URL not Found");
  res.redirect(entry.originalUrl);
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(port, () =>
      console.log(`Servidor rodando em http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });
