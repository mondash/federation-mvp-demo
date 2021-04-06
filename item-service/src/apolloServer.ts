import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer } from "apollo-server-express";

import modules from "modules";

export const getApolloServer = (): ApolloServer =>
  new ApolloServer({
    schema: buildFederatedSchema(modules),
  });
