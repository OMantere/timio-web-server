import * as actionTypes from 'actions/actionTypes'
import { processUsages } from 'lib/usages'

export default function usagesReducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.FETCH_DATA:
            return processUsages(action.data.payload.usages);
        default:
            return state;
    }
}