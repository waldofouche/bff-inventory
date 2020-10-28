import React, { useState, useContext, Component } from "react";
import { Link as Link1 } from "react-router-dom";
import Axios from "axios";
import Link from "@material-ui/core/Link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function createData(month, amount) {
  return { month, amount };
}
const d = new Date();
const month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

const n = month[d.getMonth()];

class Deposits extends Component {
  constructor(props) {
    super(props);

    // this.deleteProduct = this.deleteProduct.bind(this);
    this.state = { orders: [], tabValue: 0, setValue: 0, loading: false };
  }
  componentDidMount() {
    let results = [];
    this.setState({ loading: true });
    Axios.get("http://localhost:5000/wooCommerce/orders")
      .then((response) => {
        console.log(response.data);
        response.data.forEach((order, index) => {
          results.push({
            id: order.id,
            salePrice: order.total,
            status: order.status,
            date: order.date_created,
          });
        });
        this.setState({ orders: results, loading: false });
        // console.log(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { classes } = this.props;
    let forGraphResults = [];
    this.state.orders.forEach((order, index) => {
      forGraphResults.push(
        createData(
          order.date.split("-", 2)[1] + "/" + order.date.split("-", 2)[0],
          order.salePrice
        )
      );
    });

    console.log(forGraphResults);
    return (
      <React.Fragment>
        <Title>Current Month Sales</Title>
        <Typography component="p" variant="h4">
          $9999
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          {n} {new Date().getFullYear()}
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View balance
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Deposits);
