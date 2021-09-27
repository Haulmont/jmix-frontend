import React from "react";
import "./App.css";
import { securityStore } from "../index";
import Login from "./login/Login";
import { observer } from "mobx-react";
import { AppMain } from "./app-main/AppMain";

export const App = observer(() => {
  if (!securityStore.isLoggedIn) {
    return <Login />;
  }

  return <AppMain />;
});

export default App;
