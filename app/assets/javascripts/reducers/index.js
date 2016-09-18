import { combineReducers } from "redux";
import statsReducer from './statsReducer'
import usagesReducer from './usagesReducer'
import errorsReducer from './errorsReducer'

export default combineReducers({
    stats: statsReducer,
    usages: usagesReducer,
    errors: errorsReducer
});