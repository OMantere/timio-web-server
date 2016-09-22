import * as actionTypes from 'actions/actionTypes'

export default function userReducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.FETCH_DATA:
           return action.payload.data.user;
        default:
            return state;
    }
}