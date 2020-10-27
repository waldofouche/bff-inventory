import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {useHistory} from 'react-router-dom'
import { Link as ReactDomLink} from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});


export default function DisplayLowStockItems() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title alignItem = "center">Low Stock </Title>
      <Typography component="p" variant="h4">
        2
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Unique Items
      </Typography>
      <div>
        <Link color="primary" href="/inventory" component={ReactDomLink} to ="/inventory">
          Go to inventory
        </Link>
      </div>
    </React.Fragment>
  );
}