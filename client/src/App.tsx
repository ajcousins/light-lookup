import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IntroPage from "./components/IntroPage/IntroPage";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct/AddProduct";
import ComingSoon from "./components/ComingSoon";
import AddManufacturer from "./components/AddManufacturer/AddManufacturer";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./app/customTheme";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache(),
});

console.log("ENDPOINT:", process.env.REACT_APP_API_ENDPOINT);

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
                  <Route exact path='/' component={IntroPage} />
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/addproduct' component={AddProduct} />
                  <Route exact path='/comingsoon' component={ComingSoon} />
                  <Route
                    exact
                    path='/addmanufacturer'
                    component={AddManufacturer}
                  />
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
