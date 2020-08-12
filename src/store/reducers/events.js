import * as actionTypes from '../actions/actionTypes';



const initialState ={
    events:[],
    event:{},
    eventList:false,
    bookDetails:{}
}

const fetchEvents = (state,action) =>{
    return{
        ...state,
        events:action.events,
        eventList:false
    }
}
const fetchSingleEvent =(state,action) =>{
  const event = state.events.find(event => event.name === action.name);
  return{
    ...state,
    event:event,
    eventList:true
  }
}

const searchEvents =(state,action) =>{
    let task = action.taskProperty;
        let currentEvents = action.searchList;
        let newEvents = action.searchList;
        if (task !== "") {
          newEvents = currentEvents.filter((event) => {
            const lcTask = event.name.toLowerCase();
            const filterTask = task.toLowerCase();
            return lcTask.startsWith(filterTask);
          });
         }
        return {
          ...state,
          events: newEvents,
        };
  }

const bookDetailsInfo =(state,action) =>{
   return{
     ...state,
     bookDetails:action.ticketInfo
   }
}
const reducer =(state=initialState,action) =>{
     switch(action.type){
         case actionTypes.FETCH_EVENTS: return fetchEvents(state,action);

         case actionTypes.SEARCH_EVENTS: return searchEvents(state,action);

         case actionTypes.FETCH_SINGLE_EVENT: return fetchSingleEvent(state,action);

         case actionTypes.BOOK_DETAIL: return bookDetailsInfo(state,action);

         default: return state;
     }
}

export default reducer;