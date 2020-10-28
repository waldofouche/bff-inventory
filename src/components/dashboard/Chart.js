import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
import CircularProgress from "@material-ui/core/CircularProgress";

// Generate Sales Data
function createData(month, amount) {
  return { month, amount };
}

const useStyles = () => ({});

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
        response.data.forEach((order, index) => {
          results.push({
            id: order.id,
            salePrice: order.total,
            status: order.status,
            date: order.date_created,
          });
        });
        this.setState({ orders: results, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let forGraphResults = [];
    this.state.orders.forEach((order) => {
      forGraphResults.push([
        order.date.split("-", 2)[1] + "/" + order.date.split("-", 2)[0],
        order.salePrice,
      ]);
    });
    console.log(forGraphResults);

    let sumOfEachMonth = [];

    // for(let i = 0; i<)

    // for (let i = 0; i < forGraphResults.length; i++) {
    //   for (let j = 0; j < forGraphResults[i].length - 1; j++) {
    //     if (forGraphResults[i][j] === forGraphResults[i + 1][j + 1]) {
    //       sumOfEachMonth.push(
    //         createData(
    //           forGraphResults[i],
    //           forGraphResults[i][j + 1] + forGraphResults[i + 1][j + 1]
    //         )
    //       );
    //     }
    //   }
    // }
    //have 0,0 axis
    sumOfEachMonth.push(createData(0, 0));
    // let updatedOrders = this.state.orderList.filter((order) =>
    // order.date.watever > lowerbound && order.date.whatever < upperbound)

    return (
      <React.Fragment>
        <Title>{new Date().getFullYear()}</Title>

        <ResponsiveContainer>
          <LineChart
            data={sumOfEachMonth.reverse()}
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
        <CircularProgress
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Chart);
