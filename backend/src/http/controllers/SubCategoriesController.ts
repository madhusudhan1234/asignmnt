import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { SubCategory } from "../../database/entities/SubCategory";
import { SubCategoryDTO } from "../dtos/SubcategoryDTO";

export class SubCategoriesController {
  async get(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(SubCategory)
      .createQueryBuilder()
      .orderBy("id", "DESC");
    const { records: categories, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );
    return ResponseUtil.sendResponse(
      res,
      "Fetched subcategories successfully",
      categories,
      paginationInfo
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const subCategoryData = req.body;
    console.log(subCategoryData);
    const dto = new SubCategoryDTO();
    Object.assign(dto, subCategoryData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(SubCategory);
    const subCategory = repo.create(subCategoryData);

    await repo.save(subCategory);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new category",
      subCategory,
      200
    );
  }

  async getDetail(req: Request, res: Response) {
    const subcategoryId = req.params.id;
    const subcategoryRepository = AppDataSource.getRepository(SubCategory);
    const subcategory = await subcategoryRepository
      .createQueryBuilder("subcategory")
      .where("subcategory.id = :id", { id: subcategoryId })
      .getOne();
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const subCategory = await AppDataSource.query(`
      SELECT c.title AS categoryTitle, s.title AS subcategoryTitle, s.description AS description, 
        json_agg(json_build_object('url', i.url)) AS images 
      FROM subcategories s 
      INNER JOIN categories c ON s."categoryId" = c."id"
      INNER JOIN subcategories_images_images si ON s."id" = si."subcategoryId"
      INNER JOIN images i ON si."imageId" = i."id"
      WHERE s.id = '${subcategoryId}'
      GROUP BY c.title, s.title, s.description
      LIMIT 1;
    `);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new category",
      subCategory,
      200
    );
  }
}
