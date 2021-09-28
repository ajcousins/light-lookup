import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct/AddProduct";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./app/customTheme";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// For firebase auth- use AuthProvider/ useContext

function App() {
  return (
    <>
      <Router>
        <Switch>
          <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
              <div className='structure'>
                <Header />
                <div className='structure__body'>
                  <Route exact path='/' component={Dashboard} />
                  <Route exact path='/addproduct' component={AddProduct} />
                </div>
                <Footer />
              </div>
            </ApolloProvider>
          </ThemeProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
