import * as actionTypes from 'actions/actionTypes'

export default function usagesReducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.FETCH_DATA:
            return action.payload.data.usages;
        default:
            return state;
    }
}