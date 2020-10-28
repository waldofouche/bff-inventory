import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";


import UserContext from "./components/context/UserContext";

// Import Pages
import Home from "./components/pages/Home";
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
import Inventory from "./components/inventory/Inventory"
import SignUp from "./components/auth/SignUp"
import Orders from "./components/orders/Orders"


// Colors
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/deepOrange';
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

// Import Styling
import "./style.css";
import { dark } from "@material-ui/core/styles/createPalette";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: orange[400],
      contrastText: '#fff'
    },
    secondary: {
      main: green[500],
    },
    
  },
});


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
      
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <ThemeProvider theme ={theme} >
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Dashboard} />
              <Route path="/inventory" component={Inventory} />
              <Route path ="/register" component = {SignUp} />
              <Route path = "/orders" component = {Orders} />
            </Switch>
          </div>
          </ThemeProvider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}