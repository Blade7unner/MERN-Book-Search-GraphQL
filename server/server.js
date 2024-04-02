const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth'); // Importing auth middleware
const { typeDefs, resolvers } = require('./schemas'); // Importing typeDefs and resolvers
const { verify } = require('jsonwebtoken'); // Importing verify function from jsonwebtoken

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Implement Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Verify and decode JWT token from request headers
    let token = req.headers.authorization || '';
    if (token) {
      token = token.split(' ').pop().trim();
      // Decode token to extract user data
      const decoded = verify(token, 'mysecretsshhhhh');
      // Add user data to context
      return { user: decoded };
    }
  },
});

// Apply Apollo Server middleware to Express app
server.applyMiddleware({ app });

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
