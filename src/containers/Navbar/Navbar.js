import React,{ Component } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import NavigationItems from '../NavigationItems/NavigationItems';

 class Navbar extends Component {
     render(){
        return(
            <header className={classes.Navbar}>
                <div >
                    <h1>{this.props.eventList ? this.props.event.name : 'Events'}</h1>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </header>
            );
     }
   
}
   
const mapStateToProps = state =>{
    return{
        eventList: state.eventList,
        event:state.event
    }
}

export default connect(mapStateToProps)(Navbar);