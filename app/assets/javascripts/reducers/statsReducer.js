import * as actionTypes from 'actions/actionTypes'

export default function statsReducer(state = {}, action) {
   switch(action.type) {
       case actionTypes.FETCH_DATA:
           return action.payload.data.stats;
       default:
           return state;
   }
}