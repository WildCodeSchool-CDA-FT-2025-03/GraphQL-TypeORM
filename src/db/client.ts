import { DataSource } from "typeorm";
import { Wines } from "../wines/wines.entity";
import { Grapes } from "../grapes/grapes.entity";
import "dotenv/config";
import { Users } from "../users/user.entities";

const dataSource = new DataSource({
  entities: [Wines, Grapes, Users],
  type: "postgres",
  host: "db", // Nom du container en prod, souvent en variable d'environnement
  port: 5432,
  username: "julien", // Nom de l'utilisateur de DB, souvent en variable d'environnement
  password: "password", // MOt de passe, toujours en variable d'environnement
  database: "wines", // Nom de la base de donnée, souvent en variable d'environnement
  synchronize: true, // Désactivé en production (Possible de la mettre en variable d'env)
  migrations: ["src/migrations/*.ts"], // Destination de nos fichiers de migration
});

export default dataSource;

/**
 * host
 * user
 * database
 * password
 *
 */
