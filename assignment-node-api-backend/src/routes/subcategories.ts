import express from "express";
import { SubCategoriesController } from "../http/controllers/SubCategoriesController";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";

const router = express.Router();

const subCatagoryController = new SubCategoriesController();

router.get("/", ErrorHandler.catchErrors(subCatagoryController.get));
router.post("/", ErrorHandler.catchErrors(subCatagoryController.create));

export default router;
