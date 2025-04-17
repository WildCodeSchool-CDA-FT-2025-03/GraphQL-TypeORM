import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744892542646 implements MigrationInterface {
    name = 'Init1744892542646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grapes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b6d46febd3dff5c80de0acf6576" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wines" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "region" character varying NOT NULL, "country" character varying NOT NULL, "description" character varying NOT NULL, "tanin" character varying NOT NULL, "fruit" character varying NOT NULL, "shelf_life" character varying NOT NULL, "price_range" character varying NOT NULL, CONSTRAINT "PK_9533c1931b8e10abae016745f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grapes_by_wines" ("grapesId" integer NOT NULL, "winesId" integer NOT NULL, CONSTRAINT "PK_605c5f567edfe83379c16d4fc63" PRIMARY KEY ("grapesId", "winesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f73e67a9989b91abed0fcd607" ON "grapes_by_wines" ("grapesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb066becc2b5bcbff4ceef0c62" ON "grapes_by_wines" ("winesId") `);
        await queryRunner.query(`ALTER TABLE "grapes_by_wines" ADD CONSTRAINT "FK_5f73e67a9989b91abed0fcd6070" FOREIGN KEY ("grapesId") REFERENCES "grapes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "grapes_by_wines" ADD CONSTRAINT "FK_bb066becc2b5bcbff4ceef0c622" FOREIGN KEY ("winesId") REFERENCES "wines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grapes_by_wines" DROP CONSTRAINT "FK_bb066becc2b5bcbff4ceef0c622"`);
        await queryRunner.query(`ALTER TABLE "grapes_by_wines" DROP CONSTRAINT "FK_5f73e67a9989b91abed0fcd6070"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb066becc2b5bcbff4ceef0c62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f73e67a9989b91abed0fcd607"`);
        await queryRunner.query(`DROP TABLE "grapes_by_wines"`);
        await queryRunner.query(`DROP TABLE "wines"`);
        await queryRunner.query(`DROP TABLE "grapes"`);
    }

}
