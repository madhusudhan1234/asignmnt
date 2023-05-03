import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CATEGORIES } from "../../constants/DBTable";
import { SubCategory } from "./SubCategory";

@Entity(CATEGORIES)
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subcategories: SubCategory[];
}
