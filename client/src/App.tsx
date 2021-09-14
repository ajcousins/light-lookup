import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Query from "./components/Query";

// apollo client connection
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Light Lookup</h1>
        <Query />
      </div>
    </ApolloProvider>
  );
}

export default App;
