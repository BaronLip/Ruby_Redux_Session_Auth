import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import usersReducer from '../reducers/usersReducer'
import sessionsReducer from '../reducers/sessionsReducer';

export default configureStore({
  reducer: {
    session: sessionsReducer,
    user: usersReducer,
  },
  middleware: [thunk]
  
});
