import * as actionTypes from 'actions/actionTypes'
import _ from 'lodash'

export default function errorsReducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.FETCH_DATA:
            if (_.isEmpty(action.payload.data.usages)) {
                return {
                    ...state,
                    emptyData: true
                }
            } else {
                return {
                    ...state
                }
            }
        default:
            return state;
    }
}
