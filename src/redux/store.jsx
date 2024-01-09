// store.js is where we combine all of our reducers into one store: like slices of pizza makes a whole pizza.
//every data is first updated in the store and then passed to the component 
//state is not directly updated in the component copy of the state is passed to the component which is called mutable state

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer'; 
import projectReducer from './projectReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer, // Add the project reducer
  },
});

export default store;
