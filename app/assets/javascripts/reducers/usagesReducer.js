import * as actionTypes from 'actions/actionTypes'
import { processUsages } from 'lib/usages'

export default function usagesReducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.FETCH_DATA:
            console.log(action.payload.data.usages)
            return processUsages(action.payload.data.usages);
        default:
            return state;
    }
}