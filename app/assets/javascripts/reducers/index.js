import { combineReducers } from "redux";
import statsReducer from './statsReducer'
import usagesReducer from './usagesReducer'

export default combineReducers({
    stats: statsReducer,
    usages: usagesReducer
});