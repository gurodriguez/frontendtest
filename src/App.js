import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderApp from './components/HeaderApp';
import FooterApp from './components/FooterApp';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <HashRouter>
        <HeaderApp />
        <Switch>
        <Route exact path="/product-detail" name="Product Detail" render={props => <ProductDetail {...props} />} />
          <Route exact path="/" name="Home" render={props => <ProductList {...props} />} />
        </Switch>
        <FooterApp />
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
