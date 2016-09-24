import * as actionTypes from 'actions/actionTypes'
import { processUsages } from 'lib/usages'

export default function dataReducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.FETCH_DATA:
            return processUsages(action.payload.data.usages);
        case actionTypes.SIGN_OUT:
            return {};
        default:
            return state;
    }
}