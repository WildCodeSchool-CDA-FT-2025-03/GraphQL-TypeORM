import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { WinesResolver } from "./wines/wines.resolvers";
import dataSource from "./db/client";
import { buildSchema } from "type-graphql";
import "dotenv/config";
import { UsersResolver } from "./users/user.resolvers";

(async () => {
  console.log("Hello modification en cours");
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [WinesResolver, UsersResolver],
  });

  const server = new ApolloServer({ schema });
  await startStandaloneServer(server, {
    listen: { port: +process.env.SERVER_PORT },
  });
})();
