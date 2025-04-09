import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { WinesResolver } from "./wines/wines.resolvers";
// import { winesDef } from "./wines/wines.types";
import dataSource from "./db/client";
import { buildSchema } from "type-graphql";
import "dotenv/config";

// const typeDefs = `#graphql
//   type Wines ${winesDef}

//   type Query {
//     getAllWines: [Wines]
//   }

(async () => {
  console.log("Hello modification en cours");
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [WinesResolver],
  });

  const server = new ApolloServer({ schema });
  await startStandaloneServer(server, {
    listen: { port: +process.env.PORT },
  });
})();
