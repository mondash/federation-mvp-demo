import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";

const gateway = new ApolloGateway({
  serviceList: [
    { name: "Item", url: "http://localhost:4001/graphql" },
    { name: "User", url: "http://localhost:4002/graphql" },
  ],
});


export const getApolloServer = (): ApolloServer =>
  new ApolloServer({
    gateway,
    subscriptions: false,
  });
