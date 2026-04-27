import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        mirror(input: String!): String!
        throw: String!
        sessions: [Session!]!
      }

      type Session {
        user: User
      }

      type User {
        id: ID!
        name: String!
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
        sessions: () => {
          return [
            {
              user: {
                id: "1",
                name: "John Doe",
              },
            },
            {
              user: null,
            },
          ];
        },
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
