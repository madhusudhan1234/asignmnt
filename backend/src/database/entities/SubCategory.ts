import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToMany(() => Image, (image) => image.subcategories)
  @JoinTable({ name: "subcategories_images_images" })
  images: Image[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
