import React, { useState, useContext, Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Refresh } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Table Imports
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function refreshPage() {
  window.location.reload(true);
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  table: {
    minWidth: 650,
  },
});

const Product = (props) => (
  <tr>
    <td>{props.wooProduct.name}</td>
    <td>{props.wooProduct.sku}</td>
    <td>{props.product.supplier}</td>
    <td>{props.wooProduct.price}</td>
    <td>{props.wooProduct.sale_price}</td>
    <td>{props.product.curentStock}</td>
    <td>{props.product.onOrder}</td>
    <td>{props.product.royalty}</td>
    <td>{props.product.wooID}</td>
    <td>{props.product.salePrice}</td>
    <td>
      <Link to={"/edit/" + props.wooProduct.id}>edit </Link>
      <a
        href="#"
        onClick={refreshPage}
        onClick={() => {
          {
            props.deleteProduct(props.wooProduct.id);
          }
        }}
      >
        delete{" "}
      </a>
    </td>
  </tr>
);

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = { products: [], tabValue: 0, setValue: 0 };
  }

  componentDidMount() {
    
  }

  deleteProduct(id) {
    Axios.delete("http://localhost:5000/products/" + id).then((res) => {
      console.log(res.data);
    });

    this.setState({
      products: this.state.products.filter((el) => el.id !== id),
    });
  }

  productsList() {
    return this.state.products.map((currentproduct, index) => {
      return (
        <Product
          product={currentproduct}
          wooProduct={this.state.wooProducts[index]}
          deleteProduct={this.deleteProduct}
          key={currentproduct._id}
        />
      );
    });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const { classes } = this.props;
    console.log("Products", this.state.products);
    console.log("Woo Products", this.state.wooProducts);
    // this.state.products.map((product) => (console.log("SKU", product.invSKU)))
    // console.log("SKU", this.state.products.invSKU);
    return (
      <>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleTabChange.bind(this)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="All Items" />
            <Tab label="In Stock" />
            <Tab label="Low Stock" />
            <Tab label="Out of Stock" />
          </Tabs>
        </Paper>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">SKU</TableCell>
                <TableCell align="right">Supplier</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Sale Price</TableCell>
                <TableCell align="right">Stock on Hand</TableCell>
                <TableCell align="right">Stock on Order</TableCell>
                <TableCell align="right">Artist Royalty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.invProductName}
                  </TableCell>
                  <TableCell align="right">{product.slug}</TableCell>
                  <TableCell align="right">{product.invSupplier}</TableCell>
                  <TableCell align="right">{product.invPrice}</TableCell>
                  <TableCell align="right">{product.invSalePrice}</TableCell>
                  <TableCell align="right">{product.invCurentStock}</TableCell>
                  <TableCell align="right">{product.invOnOrder}</TableCell>
                  <TableCell align="right">{product.invRoyalty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
         
    );
    
  }
}

export default withStyles(useStyles)(Inventory);
