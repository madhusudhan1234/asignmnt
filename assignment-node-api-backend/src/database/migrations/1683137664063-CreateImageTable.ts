import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateImageTable1683137664063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "image",
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
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "image_subcategory",
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
      "image_subcategory",
      new TableForeignKey({
        columnNames: ["imageId"],
        referencedColumnNames: ["id"],
        referencedTableName: "image",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "image_subcategory",
      new TableForeignKey({
        columnNames: ["subcategoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: "subcategory",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("image_subcategory", "subcategoryId");
    await queryRunner.dropForeignKey("image_subcategory", "imageId");
    await queryRunner.dropTable("image_subcategory");
    await queryRunner.dropTable("image");
  }
}
