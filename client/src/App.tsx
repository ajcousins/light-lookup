import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { cyan, grey, indigo, yellow } from "@mui/material/colors";
// import { Canvas } from "@react-three/fiber";

// apollo client connection
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// material UI
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffee71",
    },
    // secondary: grey,
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 10,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Header />
          <Dashboard />
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
