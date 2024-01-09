// userReducer.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setCountSummary: (state, action) => {
      return action.payload;
    },
    
  },
});

export default userSlice.reducer;
//micro reducer passed to store.js
export const { setCountSummary } = userSlice.actions;
