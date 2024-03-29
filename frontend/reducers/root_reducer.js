import { combineReducers } from 'redux';

import entities from './entities_reducer';
import errors from './errors_reducer';


const rootReducer = combineReducers({
    entities,
    errors,
});

export default rootReducer;