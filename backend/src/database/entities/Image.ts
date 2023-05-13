import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IMAGES } from "../../constants/DBTable";
import { SubCategory } from "./SubCategory";

@Entity(IMAGES)
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  url: string;

  @ManyToMany(() => SubCategory, (subcategory) => subcategory.images)
  subcategories: SubCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
