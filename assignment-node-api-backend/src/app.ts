import express, { Express, Request, Response } from "express";
const path = require("path");

import bodyParser from "body-parser";
import cors from "cors";
import { ErrorHandler } from "./http/middlewares/ErrorHandler";
import categoryRoute from "./routes/categories";
import imagesRoute from "./routes/images";
import subCategoryRoute from "./routes/subcategories";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/images", imagesRoute);
app.use("/categories", categoryRoute);
app.use("/subcategories", subCategoryRoute);
app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid Route",
  });
});

// Define a middleware function to handle the errors
app.use(ErrorHandler.handleErrors);

export default app;
