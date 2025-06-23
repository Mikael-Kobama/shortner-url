import express from "express";
import path from "path";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
