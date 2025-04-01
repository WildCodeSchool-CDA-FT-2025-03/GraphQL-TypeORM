import { DataSource } from "typeorm";
import { Wines } from "../wines/wines.entity";
import { Grapes } from "../grapes/grapes.entity";

const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Wines, Grapes],
  logging: true,
  synchronize: true,
});

export default dataSource;
