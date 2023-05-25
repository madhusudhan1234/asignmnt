import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IMAGE_PRODUCT } from "../../constants/DBTable";

@Entity(IMAGE_PRODUCT)
export class ImageProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  imageId: number;

  @Column({ nullable: false })
  productId: string;
}
