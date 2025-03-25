console.log("Hello World");
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getAllWines } from "./wines/wines.resolvers";
import { winesDef } from "./wines/wines.types";

const typeDefs = `#graphql
  type Wines ${winesDef}

  type Query {
    getAllWines: [Wines]
  }
`;

const resolvers = {
  Query: {
    getAllWines,
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
