// import { default as wines } from "../../data.json";
import { Wines } from "./wines.entity";
//import type { Wines } from "./wines.types";
import { Arg, Query, Resolver } from "type-graphql";
//const myData: Wines[] = [...wines];
import redisClient from "../db/redis";

@Resolver()
export class WinesResolver {
  // @Authorized(["user@app.co"])
  @Query(() => [Wines])
  // Regarder si la data est dans le cache
  async getAllWines(@Arg("page") page: number) {
    // si oui, retourne la donnée du cache

    // page 1 => 1,30
    // page 2 => 31, 60
    // page 3 => 61, 90
    // ..., 3, 4, 5 6
    const key = `wines-page-${page}`; // getAllWines-page-2
    const cacheWines = await redisClient.get(key);
    console.info("cache data", cacheWines);
    if (cacheWines) {
      console.info("Return the cache");
      return JSON.parse(cacheWines);
    }

    // si non, effectue la requete en DB
    // mets la data en cache
    // renvoie la donnee
    console.info("Request the data on the DB");
    const wines = await Wines.find({
      relations: ["grapes"],
      take: 30,
    });
    console.info("Data from the DB", wines);
    await redisClient.set(key, JSON.stringify(wines));
    return wines;
  }

  getRandom(id: number) {
    return Math.floor(Math.random() * id);
  }

  // @Mutation(() => Int)
  // createWine(
  //   _: unknown,
  //   // args: { name: string; region: string; description: string }
  //   @Arg("name") name: string,
  //   @Arg("region") region: string,
  //   @Arg("description") description: string
  // ) {
  //   const newId = myData[myData.length - 1].id + 1;
  //   // const { name, description, region } = args;

  //   return myData[myData.length - 1];
  // }
}
