
// api.js
import axios from 'axios';
import { setCountSummary } from './../redux/userReducer';
import store from './../redux/store';
import { setProjects } from './../redux/projectReducer';

const axiosWithAuth = axios.create();

export const getCountSummary = async (accessToken) => {
  try {
    const response = await axiosWithAuth.get(
      'https://pharma-release.server247.info/core-api/api/app/count/count-summary',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data) {
      console.error('Error fetching count summary: No data in the response');
      throw new Error('No data in the response');
    }

    const data = response.data;
    console.log('Fetched count summary data:', data);

    // Dispatch the setCountSummary action
    store.dispatch(setCountSummary(data));

    return data;
  } catch (error) {
    console.error('Error fetching count summary:', error.message);
    throw error;
  }
};

//for project
export const getProjects = async (accessToken, pagination) => {
  try {
    const response = await axiosWithAuth.get(
      'https://pharma-release.server247.info/core-api/api/app/project/paged-and-sorted-list',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          MaxResultCount: pagination.pageSize,
          SkipCount: (pagination.current - 1) * pagination.pageSize,
        },
      }
    );

    if (!response.data || !response.data.success) {
      console.error('Error fetching projects: No success in the response');
      throw new Error('No success in the response');
    }

    const projects = response.data.data.items;
    console.log('Fetched projects data:', projects);

    // Dispatch the setProjects action
    store.dispatch(setProjects(projects));

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
};

// add project


// Adjust the import path as per your project structure

export const addProject = async (newProject, accessToken) => {
  try {
    // Make API request to add project
    const response = await axiosWithAuth.post(
      'https://pharma-release.server247.info/core-api/api/app/project',
      newProject,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response || !response.data || !response.data.success) {
      console.error('Error adding project: No success in the response');
      throw new Error('No success in the response');
    }

    const addedProject = response.data.data;
    console.log('Added project data:', addedProject);

    return addedProject;
  } catch (error) {
    console.error('Error adding project:', error.message);
    throw error;
  }
};



export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

const api={ 
  getCountSummary,
  
}

export default api;
