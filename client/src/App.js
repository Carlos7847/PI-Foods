import "./App.css";
import React from "react";
import Landing from "./components/Landing/Landing";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import Default from "./components/Default/Default";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={"/"}>
          <Landing />
        </Route>
        <Route exact path={"/home"}>
          <Home />
        </Route>
        <Route path={"/create"}>
          <Create />
        </Route>
        <Route path={"/home/:id"}>
          <Detail />
        </Route>
        <Route path={"/"}>
          <Default />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
