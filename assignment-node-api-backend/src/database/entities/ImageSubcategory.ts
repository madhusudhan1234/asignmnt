import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IMAGE_SUBCATEGORY } from "../../constants/DBTable";

@Entity(IMAGE_SUBCATEGORY)
export class ImageSubcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageId: number;

  @Column()
  subcategoryId: string;
}
