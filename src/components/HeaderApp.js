import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    }
  }));
  

const HeaderApp = () => {
    const classes = useStyles();

    return (        
        <AppBar position="relative">
          <Toolbar>
            <ShoppingBasketIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Product Catalog 
            </Typography>
          </Toolbar>
        </AppBar>
    )
}

export default HeaderApp;