import * as actionTypes from 'actions/actionTypes'

export default function statsReducer(state = {}, action) {
   switch(action.type) {
       case actionTypes.FETCH_STATS:
           return action.payload.data;
       default:
           return state;
   }
}