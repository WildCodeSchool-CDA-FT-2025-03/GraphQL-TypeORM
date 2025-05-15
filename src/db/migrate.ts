console.info("Migration in progress");

import { Grapes } from "../grapes/grapes.entity";
import { Wines } from "../wines/wines.entity";
import { default as wines } from "./data.json";
import dataSource from "./client";

/**
 * Entité Grapes
 * Entité de Wines
 */

(async () => {
  console.info("Starting the migration");
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM grapes_by_wines");
    await queryRunner.query("DELETE FROM grapes");
    await queryRunner.query("DELETE FROM wines");
    await queryRunner.query("DELETE FROM sqlite_sequence");

    const grapes = wines.flatMap((wine) => wine.grape_varieties);
    const uniqueGrapes = [...new Set(grapes)];
    console.log(uniqueGrapes);

    const resultGrapes = await Promise.all(
      uniqueGrapes.map(async (grape) => {
        const newGrape = new Grapes();
        newGrape.name = grape;
        return await newGrape.save();
      })
    );
    console.info(resultGrapes);

    const resultWines = await Promise.all(
      wines.map(async (wine) => {
        const newWines = new Wines();
        newWines.name = wine.name;
        newWines.region = wine.region;
        newWines.country = wine.country;
        newWines.description = wine.description;
        newWines.price_range = wine.price_range;
        newWines.tanin = wine.tanin;
        newWines.fruit = wine.fruit;
        newWines.shelf_life = wine.shelf_life;

        newWines.grapes = wine.grape_varieties.map((w) => {
          return resultGrapes.find((grape) => grape.name === w);
        });

        // newWines.grapes = await Promise.all(
        //   wine.grape_varieties.map(async (w) => {
        //     return Grapes.findOneBy({ name: w });
        //   })
        // );
        return await newWines.save();
      })
    );

    console.info("Save wines", resultWines);
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();
