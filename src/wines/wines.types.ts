export const winesDef = `{
  id: Int
  name: String
  region: String
  country: String
  description: String
  grape_varieties: [String]
  tanin: String
  fruit: String
  shelf_life: String
  price_range: String
}`;

export type Wines = {
  id: number;
  name: string;
  region: string;
  country?: string;
  description: string;
  grape_varieties?: string[];
  tanin?: string;
  fruit?: string;
  shelf_life?: string;
  price_range?: string;
};
