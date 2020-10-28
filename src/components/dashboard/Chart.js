import React, { Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Axios from "axios";

// Generate Sales Data
function createData(month, amount) {
  return { month, amount };
}






const data = [
  createData('01/20', 0),
  createData('02/20', 300),
  createData('03/20', 600),
  createData('04/20', 800),
  createData('05/20', 1500),
  createData('06/20', 2000),
  createData('07/20', 1000),
  createData('08/20', 2500),
  createData('09/20', undefined),
];

export default function Chart() {
  const theme = useTheme();
  Axios.get("http://localhost:5000/orders")
  .then((response) => {
    let orders = response.data;
    console.log("All Orders: ", orders);
    this.setState({ orderList: orders });
  })
  .catch((error) => {
    console.log(error);
  });
  return (
    <React.Fragment>
      <Title>{new Date().getFullYear()}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}