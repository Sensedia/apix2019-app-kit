import { combineReducers } from 'redux';
import { auth } from "./login.reducer";
import { kits } from "./kits.reducer";

const allReducers = combineReducers({
    auth,
    kits
});

export default allReducers;