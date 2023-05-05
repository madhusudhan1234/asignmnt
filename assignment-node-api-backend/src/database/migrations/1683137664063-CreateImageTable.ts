import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import {
  IMAGES,
  IMAGE_SUBCATEGORY,
  SUBCATEGORIES,
} from "../../constants/DBTable";

export class CreateImageTable1683137664063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: IMAGES,
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "url",
            type: "text",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: IMAGE_SUBCATEGORY,
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "imageId",
            type: "integer",
          },
          {
            name: "subcategoryId",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      IMAGE_SUBCATEGORY,
      new TableForeignKey({
        columnNames: ["imageId"],
        referencedColumnNames: ["id"],
        referencedTableName: IMAGES,
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      IMAGE_SUBCATEGORY,
      new TableForeignKey({
        columnNames: ["subcategoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: SUBCATEGORIES,
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(IMAGE_SUBCATEGORY, "subcategoryId");
    await queryRunner.dropForeignKey(IMAGE_SUBCATEGORY, "imageId");
    await queryRunner.dropTable(IMAGE_SUBCATEGORY);
    await queryRunner.dropTable(IMAGES);
  }
}
