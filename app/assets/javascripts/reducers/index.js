import { combineReducers } from "redux";
import dataReducer from './dataReducer'
import errorsReducer from './errorsReducer'
import userReducer from './userReducer'

export default combineReducers({
    data: dataReducer,
    errors: errorsReducer,
    user: userReducer
});