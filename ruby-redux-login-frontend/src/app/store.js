import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../reducers/usersReducer'
import sessionsReducer from '../reducers/sessionsReducer';

export default configureStore({
  reducer: {
    session: sessionsReducer,
    user: usersReducer,
  },
});
