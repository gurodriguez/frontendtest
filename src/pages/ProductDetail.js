import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import DialogMsg from '../components/DialogMsg';


const useStyles = makeStyles((theme) => ({
  breadCrumb: {
    marginLeft: '1.2em',
    marginTop: '1.1em'
  },
  productGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
    marginTop: '1.9em',
    marginBottom: '3em'
  },
  cardMedia: {
   paddingTop: '56.25%', // 16:9    
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    marginRight: theme.spacing(1),
  }
}));


const ProductDetail = (props) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({ title: '', message: '' });
 
  if (!props.location.state) {
    return <Redirect to='/' />
  }
  const product = props.location.state.product;

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCartEvent = () => {
    setDialogData({
      title: 'Add to Cart',
      message: 'Comming soon.'
    })
    setOpenDialog(true);
  }

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumb}>
        <RouterLink color="inherit" to="/">
          Home
            </RouterLink>
        <Typography color="textPrimary">Product Detail</Typography>
      </Breadcrumbs>

      <div className={classes.productGrid} >
        <Grid item xs={12} sm={12} md={7}>
          <Card className={classes.card}>
           
            {product.image_url ? <img src={product.image_url} alt="prod" /> : null}
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography gutterBottom color="textSecondary">
               {product.brand} - {product.category.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                $ {product.price}
              </Typography>
              <Typography gutterBottom color="textSecondary">
                SKU {product.sku}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary" variant="contained" onClick={handleCartEvent}>
                <AddShoppingCartIcon className={classes.icon} />
              Add To Cart
            </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
      {openDialog ? <DialogMsg open={openDialog} handleClose={handleClose} data={dialogData} /> : null}
    </React.Fragment>
  );
};

export default ProductDetail;

