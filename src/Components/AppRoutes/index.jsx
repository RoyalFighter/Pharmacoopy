// AppRoutes.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashbaord";
import Company from "../../Pages/Company";
import Projects from "../../Pages/Projects";
import Users from "../../Pages/Users";
import ProjectForm from "../ProjectForm";


import { OidcSecure } from "@axa-fr/react-oidc";

function AppRoutes() {
  return (
   
      <Routes>
  
        <Route
          path="/dashboard"
          element={
            <OidcSecure>
              <Dashboard />
            </OidcSecure>
          }
        />
        <Route
          path="/company"
          element={
            <OidcSecure>
              <Company />
            </OidcSecure>
          }
        />
        <Route
          path="/projects"
          element={
            <OidcSecure>
              <Projects />
            </OidcSecure>
          }
        />
        <Route
          path="/users"
          element={
            <OidcSecure>
              <Users />
            </OidcSecure>
          }
        />
         <Route
          path="/projects/add"
          element={
           
              <ProjectForm/>
          
          }
        />
      </Routes>
    
  );
}

export default AppRoutes;
