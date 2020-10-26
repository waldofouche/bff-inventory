import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";


import UserContext from "./components/context/UserContext";

// Import Pages
import Home from "./components/pages/Home";
import Login from "./components/auth/Login"
import Dasboard from "./components/dashboard/Dasboard"
import Inventory from "./components/inventory/Inventory"
import SignUp from "./components/auth/SignUp"

// Import Styling
import "./style.css";


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
      
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };


  /* Checks if a user has previously logged in on the device
     and if the credentials are valid 
     -> Runs at start of accessing the website 
   */
  useEffect(() => {
    // Check if a user login token exists on the current device
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      
      // If token does not exist, create an empty one
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      // Verify validity of token
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      
      // Sets the token to the current verified user
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);




  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Dasboard} />
              <Route path="/inventory" component={Inventory} />
              <Route path ="/register" component = {SignUp} />

            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}