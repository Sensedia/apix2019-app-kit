import { combineReducers } from 'redux';
import { auth } from "./login.reducer";

const allReducers = combineReducers({
    auth
});

export default allReducers;