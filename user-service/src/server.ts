import express from "express";
import { Server } from "http";

import { getApolloServer } from "apolloServer";

type StartArgs = {
  port: number;
};

export const start = ({ port }: StartArgs): Server => {
  const app = express();
  const apolloServer = getApolloServer();

  const endpoint = `http://localhost:${port}${apolloServer.graphqlPath}`;

  apolloServer.applyMiddleware({ app, cors: false });

  return app.listen({ port }, () =>
    console.log(`🚀 Server ready at ${endpoint}`)
  );
};
