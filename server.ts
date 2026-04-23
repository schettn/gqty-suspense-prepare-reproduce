import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        mirror(input: String!): String!
      }
    `,
    resolvers: {
      Query: {
        mirror: (_, { input }) => {
          console.log("Mirroring:", input);

          if (input === "3") {
            throw new Error();
          }

          return `Mirror: ${input}`;
        },
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
