import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

// Create Apollo client instance
const client = new ApolloClient({
  uri: 'your-graphql-endpoint', // Replace 'your-graphql-endpoint' with your actual GraphQL endpoint
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
