// import { default as wines } from "../../data.json";
import { Wines } from "./wines.entity";
//import type { Wines } from "./wines.types";
import { Query, Mutation, Resolver, Int, Arg } from "type-graphql";
//const myData: Wines[] = [...wines];

@Resolver()
export class WinesResolver {
  @Query(() => [Wines])
  async getAllWines() {
    return await Wines.find();
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
