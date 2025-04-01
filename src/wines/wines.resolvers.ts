import { default as wines } from "../../data.json";
import type { Wines } from "./wines.types";
const myData: Wines[] = [...wines];

export const getAllWines = () => {
  return myData;
};

export const createWine = (
  _: unknown,
  args: { name: string; region: string; description: string }
) => {
  const newId = myData[myData.length - 1].id + 1;
  const { name, description, region } = args;
  myData.push({ name, region, description, id: newId });
  return myData[myData.length - 1];
};
