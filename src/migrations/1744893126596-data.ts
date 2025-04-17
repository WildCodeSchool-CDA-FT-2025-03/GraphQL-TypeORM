import { MigrationInterface, QueryRunner } from "typeorm";

export class Data1744893126596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO grapes (name) SELECT nom FROM mytable`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
