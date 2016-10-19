import { combineReducers } from 'redux';

// reducers
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  user: UserReducer
});

export default rootReducer;