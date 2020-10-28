import React, { Component, useEffect } from "react";
import { useTheme, withStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import Axios from "axios";

// Generate Sales Data
function createData(month, amount) {
  return { month, amount };
}

const useStyles = (theme) => ({});
const data = [
  createData("01/20", 0),
  createData("02/20", 300),
  createData("03/20", 600),
  createData("04/20", 800),
  createData("05/20", 1500),
  createData("06/20", 2000),
  createData("07/20", 1000),
  createData("08/20", 2500),
  createData("09/20", undefined),
];

class Chart extends Component {
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
    const { theme } = this.props;
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

    // let updatedOrders = this.state.orderList.filter((order) =>
    // order.date.watever > lowerbound && order.date.whatever < upperbound)

    return (
      <React.Fragment>
        <Title>{new Date().getFullYear()}</Title>
        <ResponsiveContainer>
          <LineChart
            data={forGraphResults.reverse()}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="month" />
            <YAxis>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                }}
              >
                Sales ($)
              </Label>
            </YAxis>
            <Line type="monotone" dataKey="amount" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Chart);
