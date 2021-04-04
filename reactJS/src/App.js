import React, { Component } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import Login from "./components/auth/LoginForm/login.component";
import Register from "./components/auth/RegisterForm/register.component";
import AllTasks from "./components/home/AllTasks/allTasks.component";
import CompletedTasks from "./components/home/CompletedTasks/completedTasks.component";
import HomePage from "./components/home/HomePage/homePage.component";
import PendingTasks from "./components/home/PendingTasks/pendingTasks.component";
import Dashboard from "./pages/dashboard/Dashboard";
class App extends Component {
  render() {
    return (
      <div className="app-content">
        <HashRouter>
          <Switch>
          <Route exact path='/' component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/home" component={HomePage} />

            <Route exact path="/allTasks" component={AllTasks} />

            <Route exact path="/completedTasks" component={CompletedTasks} />

            <Route exact path="/pendingTasks" component={PendingTasks} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
