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

//modal Imports
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  spinnerRoot: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px'
  },
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    //this.deleteProduct = this.deleteProduct.bind(this);
    this.state = {
      products: [],
      tabValue: 0,
      setValue: 0,
      modalOpen: false,
      currentProduct: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    Axios.get("http://localhost:5000/products")
      .then((response) => {
        return response.data;
      })
      .then((products) => {
        Axios.get("http://localhost:5000/wooCommerce/products")
          .then((response) => {
            let mergedProducts = products.map((product) => {
              return {
                ...product,
                ...response.data.find((wooProduct) => {
                  return wooProduct.id === product.invWooID;
                }),
              };
            });
            console.log("merged", mergedProducts);
            this.setState({ products: mergedProducts });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* deleteProduct(id) {
    Axios.delete("http://localhost:5000/products/" + id).then((res) => {
      console.log(res.data);
    });

    this.setState({
      products: this.state.products.filter((el) => el.id !== id),
    });
  } */

  handleModalOpen = (product) => {
    this.setState({ modalOpen: true, currentProduct: product });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const { classes } = this.props;
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
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Sale Price</TableCell>
                <TableCell align="right">Stock on Hand</TableCell>
                <TableCell align="right">Stock on Order</TableCell>
                <TableCell align="right">Artist Royalty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map((product) => (
                <TableRow
                  key={product.invWooID}
                  onClick={this.handleModalOpen.bind(this, product)}
                  hover
                >
                  <TableCell component="th" scope="row">
                    {product.invProductName}
                  </TableCell>
                  <TableCell align="right">{product.invSKU}</TableCell>
                  <TableCell align="right">{product.invPrice}</TableCell>
                  <TableCell align="right">
                    {product.invSalePrice || "-"}
                  </TableCell>
                  <TableCell align="right">{product.invCurentStock}</TableCell>
                  <TableCell align="right">{product.invOnOrder}</TableCell>
                  <TableCell align="right">{product.invRoyalty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.state.products.length == 0 && this.state.loading == true ? (
            <div className={classes.spinnerRoot}>
              <CircularProgress />
            </div>
          ) : (
            <div />
          )}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modalOpen}>
            <div className={classes.paper}>
              <h2>{this.state.currentProduct.invProductName}</h2>
              <p>SKU: {this.state.currentProduct.invSKU}</p>
              <br />
              <p>Stock on Hand: {this.state.currentProduct.invCurentStock}</p>
              <p>Stock on Order: {this.state.currentProduct.invOnOrder}</p>
              <br />
              <p>Price: ${this.state.currentProduct.invPrice}</p>
              <p>Sale Price: ${this.state.currentProduct.invSalePrice || "-"}</p>
              <p>Artist Royalty: ${this.state.currentProduct.invRoyalty}</p>
            </div>
          </Fade>
        </Modal>
      </>
    );
  }
}

export default withStyles(useStyles)(Inventory);
