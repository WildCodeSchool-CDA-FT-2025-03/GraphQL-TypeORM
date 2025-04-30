/* eslint-disable no-undef */
import { graphql, GraphQLSchema, print } from "graphql";
// Import Jest types for testing
import "jest";
import getSchema from "../schema";
import { gql } from "graphql-tag";

const GET_WINES = gql`
  query GetAllWines {
    getAllWines {
      fruit
      id
      name
      region
      tanin
      fruit
    }
  }
`;

describe("Wines resolvers", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  it("Should get all wines", async () => {
    const result = await graphql({
      schema: schema,
      source: print(GET_WINES),
      contextValue: { user: { email: "user@app.co", isConnected: true } },
    });

    expect(result.data.getAllWines).toEqual(expect.any(Array));

    expect(true).toBeTruthy();
  });
});
