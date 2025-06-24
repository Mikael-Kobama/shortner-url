import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  fullUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
});

export const Url = mongoose.model("Url", urlSchema);
