import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
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
  }
}));

const ProductCard = (props) => {
  
  const classes = useStyles();
   
  const handlerProdDetail = () => {   
    props.history.push({
      pathname: '/product-detail',
      state: {
        product: props.item
      }
    })
  }

  return (
    <Grid item key={props.item.id.toString()} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={props.item.image_url}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2">
            {props.item.name}
          </Typography>
          <Typography gutterBottom color="textSecondary">
          {props.item.brand} - {props.item.category.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            $ {props.item.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handlerProdDetail}>
            Details
            </Button>

        </CardActions>
      </Card>
    </Grid>
  )
}

export default withRouter(ProductCard);