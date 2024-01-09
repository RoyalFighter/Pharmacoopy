// projectReducer.js

import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
  },
});

export default projectSlice.reducer;
export const { setProjects, addProject } = projectSlice.actions;
