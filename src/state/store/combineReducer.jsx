import { combineReducers } from "redux";
import { countriesReducer } from "../reducer/commonApisReducer";
import root from "../reducer/reducers";
import { visaReducer } from "../reducer/visaReducer";

const reducer = combineReducers({
  countries: countriesReducer,
  rootReducer: root,
  visa: visaReducer,
});

export default reducer;
