import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./db/client";

import "dotenv/config";
import { UsersResolver } from "./users/user.resolvers";
import jwt from "jsonwebtoken";
import getSchema from "./schema";

(async () => {
  await dataSource.initialize();

  const schema = await getSchema();

  const server = new ApolloServer({ schema });
  await startStandaloneServer(server, {
    listen: { port: +process.env.SERVER_PORT },
    context: async ({ req, res }) => {
      // Vérifer si il  y a un cookie
      if (!req.headers.cookie) return { res };

      const cookies = req.headers.cookie.split("; ").reduce((acc, key) => {
        const cook = key.split("=");
        if (cook[0].startsWith("nom_dela_token")) {
          acc[cook[0]] = cook[1];
          // cook = ["adminer_key", "00791bf0cb5bb75ae15439b20ef2dd2b"]
          // acc.adminer_key = "00791bf0cb5bb75ae15439b20ef2dd2b"
        }
        return acc;
      }, {}) as { [key: string]: string };

      // Vérifier si un cookie coorespond à notre nom
      if (cookies.nom_dela_token) {
        // Récupérer le cookie avec nbotre nom et le vérifier
        const payload = jwt.verify(
          cookies.nom_dela_token, //'czjhcez'.'cdzqùcjdf'.'dcfzejc'
          "ezdzenncrnzecnxzepjkdf5461315crze"
        );

        if (payload) {
          return { res, user: payload };
        }
        return { res };
      }

      return { res };
    },
  });
})();
