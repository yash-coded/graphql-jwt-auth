import { config } from "dotenv";
config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";

const startServer = async () => {
  const app = express();
  app.use(cors());

  const getUser = (token) => {
    try {
      if (token) {
        return jwt.verify(token, process.env.TOKEN_SECRET);
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      let fullToken = req.headers.authorization || "";
      const token = fullToken.split(" ")[1];

      const user = getUser(token);

      return {
        user,
      };
    },
  });

  server.applyMiddleware({ app });

  await mongoose.connect(
    "mongodb://localhost:27017/neo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Database Connected!!");
    }
  );

  app.listen(4000, () => {
    console.log("server running on 4000");
  });
};

startServer();
