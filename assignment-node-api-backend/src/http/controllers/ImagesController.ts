import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { Image } from "../../database/entities/Image";
import { ImageSubcategory } from "../../database/entities/ImageSubcategory";
import { SubCategory } from "../../database/entities/SubCategory";
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
    const subcategoryId = req.body.subcategoryId;

    const subcategoryRepository = AppDataSource.getRepository(SubCategory);
    const imageSubcategoryRepository =
      AppDataSource.getRepository(ImageSubcategory);
    const subcategory = await subcategoryRepository
      .createQueryBuilder("subcategory")
      .where("subcategory.id = :id", { id: subcategoryId })
      .getOne();

    console.log(subcategory, req.files);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const images = req.files as Express.Multer.File[];

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    const imageRepository = AppDataSource.getRepository(Image);

    const imageEntities = images.map((image) =>
      imageRepository.create({
        name: image.filename,
        url: `http://localhost:3000/uploads/images/${image.filename}`,
      })
    );

    const savedImages = await imageRepository.save(imageEntities);
    await Promise.all(
      savedImages.map(async (image) => {
        const imageSubcategory = imageSubcategoryRepository.create({
          imageId: image.id,
          subcategoryId: subcategoryId,
        });
        await imageSubcategoryRepository.save(imageSubcategory);
      })
    );

    return ResponseUtil.sendResponse(
      res,
      "Successfully added new image",
      [],
      200
    );
  }
}
