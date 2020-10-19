import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserContext from "./context/UserContext";

// Import Pages
import Home from "./components/pages/Home";
import Login from "./components/auth/Login"
import Dasboard from "./components/dashboard/Dasboard"

// Import Styling
import "./style.css";


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });



  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Dasboard} />

            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}