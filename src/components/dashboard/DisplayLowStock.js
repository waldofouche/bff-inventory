import React, { useEffect, Component } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useHistory } from "react-router-dom";
import { Link as ReactDomLink } from "react-router-dom";
import Axios from "axios";
import { render } from "@testing-library/react";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Product = (props) => (
  <tr>
    <td>{props.wooProduct.name}</td>
    <td>{props.wooProduct.sku}</td>
    <td>{props.product.supplier}</td>
    <td>{props.wooProduct.price}</td>
    <td>{props.wooProduct.sale_price}</td>
    <td>{props.product.currentStock}</td>
    <td>{props.product.onOrder}</td>
    <td>{props.product.royalty}</td>
    <td>{props.product.wooID}</td>
    <td>{props.product.salePrice}</td>
  </tr>
);

class DisplayLowStockItems extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], tabValue: 0, setValue: 0 };
  }
  componentDidMount() {
    // Your code here
    Axios.get("http://localhost:5000/products")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // let updatedLowStock = this.state.lowStockItems.filter((product) =>
  // product.current.watever > lowerbound && order.date.whatever < upperbound)
  render() {
    let updatedLowStock = this.state.products.filter(
      (el) => el.invCurrentStock < 5
    );

    console.log(this.state.products);

    const { classes } = this.props;
    let numberOfLowStock = 0;
    if (updatedLowStock) {
      numberOfLowStock = updatedLowStock.length;
    }

    return (
      <React.Fragment>
        <Title alignItem="center">Low Stock </Title>
        <Typography component="p" variant="h4">
          {" "}
          {numberOfLowStock}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          Unique Items
        </Typography>
        <div>
          <Link
            color="primary"
            href="/inventory"
            component={ReactDomLink}
            to="/inventory"
          >
            Go to inventory
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(DisplayLowStockItems);
