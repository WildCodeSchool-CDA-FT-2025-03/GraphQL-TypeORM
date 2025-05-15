import { buildSchema } from "type-graphql";
import { WinesResolver } from "./wines/wines.resolvers";
import { UsersResolver } from "./users/user.resolvers";

const getSchema = async () => {
  return await buildSchema({
    resolvers: [WinesResolver, UsersResolver],
    validate: true,
    authChecker: ({ context }, roles: string[]): boolean => {
      return context?.user?.isConnected && context?.user.email === roles[0];
    },
  });
};

export default getSchema;
