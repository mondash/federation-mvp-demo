import { GraphQLSchemaModule } from "apollo-graphql";
import { UserInputError } from "apollo-server-core";
import { gql } from "apollo-server-express";

export type ItemMapper = {
  id: string;
  name: string;
  owner: string;
};

export type UserMapper = {
  id: string;
};

const items = [
  { id: "0", name: "Chair", owner: "0" },
  { id: "1", name: "Wallet", owner: "0" },
  { id: "2", name: "Phone", owner: "1" },
];

const typeDefs = gql`
  input AddItemInput  {
    name: String!
    owner: ID!
  }

  type Item @key(fields: "id") {
    id: ID!
    name: String!
    owner: User!
  }

  type Mutation {
    addItem(input: AddItemInput!): Item!
  }

  type Query {
    item(id: ID!): Item!
    items: [Item!]!
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    items: [Item!]!
  }
`;

const fetchItem = (id: string): ItemMapper => {
  const item = items.find(item => item.id === id);

  if (!item) throw new UserInputError("Item not found.");

  return item;
}

const fetchUserItems = (userId: string): ItemMapper[] =>
  items.filter(item => item.owner === userId);

export const resolvers: GraphQL.Resolvers = {
  Item: {
    __resolveReference: (item) => fetchItem(item.id),
    owner: (item) => ({ id: item.owner }),
  },
  Mutation: {
    addItem: (_, { input }) => {
      const newItem: ItemMapper = {
        id: String(items.length),
        name: input.name,
        owner: input.owner,
      };

      items.push(newItem);

      return newItem;
    },
  },
  Query: {
    item: (_, { id }) => fetchItem(id),
    items: () => items,
  },
  User: {
    items: (user) => fetchUserItems(user.id),
  }
};

const module: GraphQLSchemaModule = {
  typeDefs,
  resolvers,
};

export default module;
