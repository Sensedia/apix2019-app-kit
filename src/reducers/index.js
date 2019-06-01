import { combineReducers } from 'redux';
import { auth } from "./login.reducer";
import { kits } from "./kits.reducer";
import { recommendations } from "./recommendations.reducer"

const allReducers = combineReducers({
    auth,
    kits,
    recommendations
});

export default allReducers;