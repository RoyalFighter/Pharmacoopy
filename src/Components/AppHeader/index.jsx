import React from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Image } from "antd";
import { useOidc, useOidcUser } from "@axa-fr/react-oidc";

function AppHeader() {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useOidc();
  const { oidcUser } = useOidcUser();

  // Handle user icon click
  const handleUserIconClick = async () => {
    if (isAuthenticated) {
      // User is authenticated, initiate the logout process
      await logout();

     
    } else {
      // User is not authenticated, initiate the login process
      await login();
    }
  };

  return (
    <div
      className="AppHeader"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          width={140}
          src="https://pharma-release.server247.info/assets/Amnil%20Logo-548bea27.png"
        />
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{ marginLeft: 16 }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAuthenticated ? (
          <div style={{ marginRight: 16 }}>
            {/* Display user information if authenticated */}
            <span style={{ marginRight: 8 }}>Welcome, </span>
          </div>
        ) : null}
        {/* Add onClick event to the user icon */}
        <UserOutlined
          style={{ fontSize: 24, cursor: "pointer" }}
          onClick={handleUserIconClick}
        />
      </div>
    </div>
  );
}

export default AppHeader;
