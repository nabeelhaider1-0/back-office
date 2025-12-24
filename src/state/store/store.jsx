import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// Importing 'thunk' as the default export
import { thunk } from 'redux-thunk';

import rootReducer from '../reducer/reducers'; // Assuming you have your rootReducer
// import reducer from './combineReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;