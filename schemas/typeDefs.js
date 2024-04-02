// Schemas/typeDefs.js

const { gql } = require('apollo-server-express');

// Define your GraphQL schema using gql template literals
const typeDefs = gql`
  type Query {
    # Define query types here
    # Example:
    # me: User
  }

  type Mutation {
    # Define mutation types here
    # Example:
    # addUser(username: String!, email: String!, password: String!): User
  }

  # Define custom data types here
  # Example:
  # type User {
  #   _id: ID!
  #   username: String!
  #   email: String!
  # }
`;

module.exports = typeDefs;
