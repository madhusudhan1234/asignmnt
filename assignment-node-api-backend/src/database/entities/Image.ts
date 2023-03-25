import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IMAGES } from "../../constants/DBTable";

@Entity(IMAGES)
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  image: string;
}
