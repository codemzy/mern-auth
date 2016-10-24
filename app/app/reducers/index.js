import { combineReducers } from 'redux';

// reducers
import UserReducer from './reducer_user';
import AlertReducer from './reducer_alert';

const rootReducer = combineReducers({
  user: UserReducer,
  alerts: AlertReducer
});

export default rootReducer;