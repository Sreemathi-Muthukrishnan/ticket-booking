import React, { Component } from 'react';
import Search from '../Search/Search';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Events from '../Events/Events';

import * as actions from '../../store/actions/index';
import classes from './EventListing.module.css';
import { connect } from 'react-redux';
class EventListing extends Component{
    
    componentDidMount(){
        this.props.onFetchEvents();
    }
    render(){
        return(
            <Aux>
                <Search/> 
                <div className={classes.row}> 
                   {this.props.events.map((event,index) =>(
                        <Events key={index}
                        id={index}
                        name={event.name} 
                        date={event.date} 
                        seats={event.seats} 
                        img={event.image}/>
                   ))}
                   {this.props.events.length === 0 ? <h1>No results Found</h1> : null}
                </div>
            </Aux>
           
        )
    }
}
const mapStateToProps = state =>{
    return{
        events: state.events,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchEvents : () => dispatch(actions.fetchEvents()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventListing);