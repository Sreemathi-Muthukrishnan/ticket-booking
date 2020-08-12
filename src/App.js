import React , { Component } from 'react';
import classes from './App.module.css';
import Layout from './hoc/Layout/Layout';
import { Route, Switch} from "react-router-dom";
import EventListing from './containers/EventListing/EventListing';
import EventBooking from './containers/EventBooking/EventBooking';
class App extends Component {
  render(){
    return (
      <div className={classes.App}>
       <Layout>
          <Switch>
              <Route path="/eventbooking" component={EventBooking}/>
              <Route path="/" component={EventListing}/>
          </Switch>
       </Layout>
      </div>
    );
  }
  
}

export default App;
