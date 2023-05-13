import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Category } from "../../database/entities/Category";
import { CategoryDTO } from "../dtos/CategoryDTO";

export class CategoriesController {
  async get(req: Request, res: Response) {
    const categories = await AppDataSource.query(`
      SELECT
        c.id AS "categoryId",
        c.title AS "categoryTitle",
        json_agg(json_build_object(
          'id', s.id,
          'title', s.title,
          'description', s.description,
          'images', (
            SELECT json_agg(json_build_object(
              'id', i.id,
              'url', i.url
            )) FROM images i
            JOIN subcategories_images_images si ON si."imageId" = i.id
            WHERE si."subcategoryId" = s.id
          )
        )) AS "subcategories"
      FROM
        categories c
        LEFT JOIN subcategories s ON s."categoryId" = c.id
      GROUP BY
        c.id
    `);

    return ResponseUtil.sendResponse(
      res,
      "Fetched categories successfully",
      categories
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const categoryData = req.body;

    const dto = new CategoryDTO();
    Object.assign(dto, categoryData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Category);
    const category = repo.create(categoryData);

    await repo.save(category);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new category",
      category,
      200
    );
  }
}
