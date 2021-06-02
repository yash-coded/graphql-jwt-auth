import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    name: String!
    email: String!
  }
  type Token {
    token: String!
  }
  #Queries
  type Query {
    getAllUsers: [User!]!
  }

  #Mutations
  type Mutation {
    register(name: String!, email: String!, password: String!): Token!
    login(email: String!, password: String!): Token!
  }
`;
