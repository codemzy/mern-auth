import { combineReducers } from 'redux';

// reducers
import UserReducer from './reducer_user';
import ErrorReducer from './reducer_error';

const rootReducer = combineReducers({
  user: UserReducer,
  error: ErrorReducer
});

export default rootReducer;