console.log("Hello World");
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getAllWines, createWine } from "./wines/wines.resolvers";
import { winesDef } from "./wines/wines.types";

const typeDefs = `#graphql
  type Wines ${winesDef}

  type Query {
    getAllWines: [Wines]
  }

  type Mutation {
    createWine(name: String, description: String, region: String): Wines
  }
`;

const resolvers = {
  Query: {
    getAllWines,
  },
  Mutation: {
    createWine,
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await startStandaloneServer(server, {
    listen: { port: 5500 },
  });
})();
