import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { Product } from "../../database/entities/Product";
import { ProductDTO } from "../dtos/ProductDTO";

export class ProductsController {
  async get(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Product)
      .createQueryBuilder()
      .orderBy("id", "DESC");

    const { records: products, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );

    return ResponseUtil.sendResponse(
      res,
      "Fetched products successfully",
      products,
      paginationInfo
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const productData = req.body;

    const dto = new ProductDTO();
    Object.assign(dto, productData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Product);
    const product = repo.create(productData);
    console.log(productData);

    await repo.save(product);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new product.",
      product,
      200
    );
  }
}
