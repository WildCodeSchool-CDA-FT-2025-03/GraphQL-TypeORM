import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { WinesResolver } from "./wines/wines.resolvers";
// import { winesDef } from "./wines/wines.types";
import dataSource from "./db/client";
import { buildSchema } from "type-graphql";

// const typeDefs = `#graphql
//   type Wines ${winesDef}

//   type Query {
//     getAllWines: [Wines]
//   }

//   type Mutation {
//     createWine(name: String, description: String, region: String): Wines
//   }
// `;

// const resolvers = {
//   Query: {
//     getAllWines,
//   },
//   Mutation: {
//     createWine,
//   },
// };
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [WinesResolver],
  });

  const server = new ApolloServer({ schema });
  await startStandaloneServer(server, {
    listen: { port: 5500 },
  });
})();
