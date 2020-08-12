import React, { Component } from "react";
import classes from "./Events.module.css";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withRouter }from 'react-router-dom';
class Events extends Component {
  bookingHandler =(name)=>{
      this.props.history.push('/eventbooking');
      this.props.onFetchEvent(name);
  }
  render() {
    return (
      <div className={classes.cardEvent}>
        <img
          src={this.props.img}
          alt="Event"
          style={{ width: "100%", height: "200px" }}
        />
        <h2>{this.props.name}</h2>
        <p className={classes.title}>Date of Event : {this.props.date}</p>
        <p>Available Seats : {this.props.seats}</p>
        <p>
          <button disabled={this.props.seats === 0} onClick ={()=>this.bookingHandler(this.props.name)} className={classes.cardButton}>{this.props.seats !== 0 ? "Book Now" : "Sold Out"}</button>
        </p>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onFetchEvent: (name)=> dispatch(actions.fetchSingleEvent(name)),
  }
}

export default withRouter(connect(null,mapDispatchToProps)(Events));
