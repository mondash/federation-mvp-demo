import { GraphQLSchemaModule } from "apollo-graphql";
import { UserInputError } from "apollo-server-core";
import { gql } from "apollo-server-express";

const users = [
  { id: "0", name: "Bob" },
  { id: "1", name: "Joe" },
];

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  type User @key(fields: "id") {
    id: ID!
    name: String!
  }
`;

const fetchUser = (id: string): GraphQL.User => {
  const user = users.find(user => user.id === id);

  if (!user) throw new UserInputError("User not found.");

  return user;
}

export const resolvers: GraphQL.Resolvers = {
  Query: {
    user: (_, { id }) => fetchUser(id),
    users: () => users,
  },
  User: {
    __resolveReference: ({ id }) => fetchUser(id),
  }
};

const module: GraphQLSchemaModule = {
  typeDefs,
  resolvers,
};

export default module;
