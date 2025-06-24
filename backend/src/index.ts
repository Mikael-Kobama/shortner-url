import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";
import { Url } from "./model";
import { generateShortCode } from "..generateCode/utils/generateCode";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend")));


app.post("/shorten", async (req: Request, res: Response) => {
  const { fullUrl } = req.body;

  if (!fullUrl || typeof fullUrl !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const existing = await Url.findOne({ fullUrl });
  if (existing) {
    return res.json({
      fullUrl: existing.fullUrl,
      shortUrl: existing.shortUrl,
      shortLink: `${req.protocol}://${req.get("host")}/${existing.shortUrl}`,
      clicks: existing.clicks,
    });
  }

  let shortUrl: string;
  do {
    shortUrl = generateShortCode();
  } while (await Url.exists({ shortUrl }));

  const newUrl = await Url.create({ fullUrl, shortUrl });

  return res.status(201).json({
    fullUrl,
    shortUrl,
    shortLink: `${req.protocol}://${req.get("host")}/${shortUrl}`,
    clicks: 0,
  });
});
