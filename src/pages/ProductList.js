import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ProductCard from '../components/ProductCard';
import DialogMsg from '../components/DialogMsg';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  categoryDiv: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const ProductList = (props) => {
  const [data, setData] = useState({ results: [], next: null, previous: null });
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({ title: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [urlProducts, setUrlProducts] = useState(process.env.REACT_APP_API_URL + '/products/');
  const [categ, setCateg] = React.useState('');

  const handleChange = (event) => {
    setCateg(event.target.value);
    if(event.target.value) {
      setUrlProducts(process.env.REACT_APP_API_URL + '/products/?category='+ event.target.value);
    } else {
      setUrlProducts(process.env.REACT_APP_API_URL + '/products/');
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await axios(
          urlProducts,
        );
       
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setDialogData({
          title: 'Alert',
          message: 'An error happend getting the data! please try later.'
        })
        setOpenDialog(true);
      }



    };

    fetchData();
  }, [urlProducts]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const result = await axios(
          process.env.REACT_APP_API_URL + '/categories/',
        );
        
        setCategories(result.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setDialogData({
          title: 'Alert',
          message: 'An error happend getting the data! please try later.'
        });
        setIsLoading(false);

        setOpenDialog(true);
      }



    };

    fetchCategories();
  }, []);

  const handlerPaginateNext = (type) => {

    console.log(type + ' next: ' + data.previous);
    console.log(type + ' prev: ' + data.next);
    if (type === 'next') {
      setUrlProducts(data.next);
    } else {
      setUrlProducts(data.previous);
    }


  }

  const classes = useStyles();

  return (
    <main>
      <div className={classes.heroContent}>
        <Container key="header" maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            The Shopping Store
            </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Welcome to this greatfull store.
            </Typography>

        </Container>
      </div>
      <div className={classes.root}>
        {isLoading ? (<LinearProgress />) : null}
      </div>
      <Container key="body" className={classes.cardGrid} maxWidth="md">
        <div className={classes.categoryDiv}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Categories
        </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={categ}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categories.map((category)=>(
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}        
            
            </Select>           
          </FormControl>
        </div>
        <Grid container spacing={4}>
          {data.results.map((product) => (
            <ProductCard key={product.id} item={product} {...props} />
          ))}
        </Grid>
      </Container>
      <Container key="nav">
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button color="primary" disabled={!data.previous} onClick={() => handlerPaginateNext('previous')}>
                Back
                  </Button>
            </Grid>
            <Grid item>
              <Button color="primary" disabled={!data.next} onClick={() => handlerPaginateNext('next')}>
                Next
                  </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <DialogMsg open={openDialog} handleClose={handleClose} data={dialogData} />
    </main>
  )
}

export default ProductList;