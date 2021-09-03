import './App.css';
import HomePage from './home'
import GitDetail  from './gitdetails'
import Usersearch from './userSearch';
import {BrowserRouter as Router,Switch,Route, } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} >
          <HomePage />
          </Route>

          <Route exact path="/gitdetails" component={GitDetail}>
            <GitDetail />
          </Route>
          <Route exact path="/userSearch" component={Usersearch}>
            <Usersearch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
