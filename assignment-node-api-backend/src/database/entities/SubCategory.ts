import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SUBCATEGORIES } from "../../constants/DBTable";
import { Category } from "./Category";
import { Image } from "./Image";

@Entity(SUBCATEGORIES)
export class SubCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;

  @ManyToMany(() => Image, (image) => image.subcategories)
  images: Image[];
}
