import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./components/Header";
import Query from "./components/Query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

// apollo client connection
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// material UI
const theme = createTheme({
  palette: {
    primary: yellow,
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 10,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <div>
          <Header />
          <Query />
        </div>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
