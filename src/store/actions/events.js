import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchEventsSuccess =(events)=>{
    return{
        type:actionTypes.FETCH_EVENTS,
        events:events
    }
}
export const fetchEvents = () =>{
    return dispatch =>{
        let fetchedEvents=[];
        return  axios.get('https://ticket-booking-e9d17.firebaseio.com/events.json')
        .then(response =>{
            console.log(response);
          for(let key in response.data){
            fetchedEvents = response.data[key];
          }
          dispatch(fetchEventsSuccess(fetchedEvents));
        })
        .catch(err=>{
         throw(err);
        })
    }
}

export const searchEventsSuccess =(itemTask,listData) => {
    return{
        type:actionTypes.SEARCH_EVENTS,
        taskProperty:itemTask,
        searchList:listData
    };
}

export const searchEvents =(itemTask) =>{
   return dispatch =>{
       return axios.get('https://ticket-booking-e9d17.firebaseio.com/events.json')
         .then(response =>{
             let listData =[];
             for( let key in response.data){
                 listData= response.data[key];
             }
             dispatch(searchEventsSuccess(itemTask,listData));
         })
         .catch(error =>{
            throw(error);
         })
   }
};

export const fetchSingleEvent =(name) =>{
    return{
        type:actionTypes.FETCH_SINGLE_EVENT,
        name:name
    }
}

export const bookDetailsInfo = (ticketInfo) =>{
    return{
        type: actionTypes.BOOK_DETAIL,
        ticketInfo:ticketInfo
    }
}