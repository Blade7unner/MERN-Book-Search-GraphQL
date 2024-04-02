// Schemas/resolvers.js

// Import your Mongoose models
const User = require('./models/User');

const resolvers = {
  Query: {
    // Define resolver functions for queries
    // Example:
    // me: () => User.findById(userId),
  },
  Mutation: {
    // Define resolver functions for mutations
    // Example:
    // addUser: (parent, args) => User.create(args),
  },
};

module.exports = resolvers;
