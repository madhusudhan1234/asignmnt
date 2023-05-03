import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IMAGES } from "../../constants/DBTable";
import { SubCategory } from "./SubCategory";

@Entity(IMAGES)
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToMany(() => SubCategory)
  @JoinTable()
  subcategories: SubCategory[];
}
