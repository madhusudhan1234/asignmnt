import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Image } from "../../database/entities/Image";
import { Paginator } from "../../database/Paginator";
import { CreateImageDTO } from "../dtos/CreateImageDTO";
const url = require("url");

export class ImagesController {
  async getImages(req: Request, res: Response) {
    const search = req.query.search?.toString();

    const builder = await AppDataSource.getRepository(Image)
      .createQueryBuilder()
      .orderBy("id", "DESC");

    if (search) {
      builder.where("LOWER(title) ILIKE :search", {
        search: `%${search.toLowerCase()}%`,
      });
    }

    const { records: images, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );

    const imagesWithFullUrls = images.map((image) => {
      const fullUrl = url.format({
        protocol: req.protocol,
        host: req.get("host"),
        pathname: `/uploads/images/${image.image}`,
      });

      return {
        ...image,
        image: fullUrl,
      };
    });

    return ResponseUtil.sendResponse(
      res,
      "Fetched images successfully",
      imagesWithFullUrls,
      paginationInfo
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const imageData = req.body;
    imageData.image = req.file?.filename;

    const dto = new CreateImageDTO();
    Object.assign(dto, imageData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Image);
    const image = repo.create(imageData);

    await repo.save(image);

    return ResponseUtil.sendResponse(
      res,
      "Successfully added new image",
      image,
      200
    );
  }
}
