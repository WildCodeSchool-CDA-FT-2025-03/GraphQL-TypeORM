import { default as wines } from "../../data.json";
import { Wines } from "./wines.entity";
//import type { Wines } from "./wines.types";
import { Query, Mutation, Resolver, Int } from "type-graphql";
const myData: Wines[] = [...wines];

@Resolver()
export class WinesResolver {
  @Query(() => [Wines])
  getAllWines() {
    return myData;
  }

  @Mutation(() => Int)
  createWine(
    _: unknown,
    args: { name: string; region: string; description: string }
  ) {
    const newId = myData[myData.length - 1].id + 1;
    const { name, description, region } = args;
    myData.push({ name, region, description, id: newId });
    return myData[myData.length - 1];
  }
}
