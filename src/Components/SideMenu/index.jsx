import React, { useState } from "react";
import { AppstoreOutlined, ShopOutlined, UserOutlined, BarsOutlined } from "@ant-design/icons";
import { Menu, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <div className={`SideMenu ${isMenuOpen ? "open" : ""}`}>
      {/* Toggle button to open/close the menu */}
      <Button className="ToggleMenuButton" onClick={toggleMenu}>
      <BarsOutlined style={{ fontSize: 20, border: "none" }} />
      </Button>

      {/* Menu content */}
      {isMenuOpen && (
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
        >
          {/* Dashboard Section */}
          <Menu.ItemGroup title={<strong>Dashboard</strong>}>
            <Menu.Item key="/dashboard" icon={<AppstoreOutlined />}>
              Dashboard
            </Menu.Item>
          </Menu.ItemGroup>

          {/* Horizontal Line */}
          <hr style={{ margin: "8px 0", border: "1px solid #d9d9d9" }} />

          {/* Pages Section */}
          <Menu.ItemGroup title={<strong>Pages</strong>}>
            <Menu.Item key="/company" icon={<AppstoreOutlined />}>
              Company
            </Menu.Item>
            <Menu.Item key="/projects" icon={<ShopOutlined />}>
              Projects
            </Menu.Item>
            <Menu.Item key="/users" icon={<UserOutlined />}>
              Users
            </Menu.Item>
          </Menu.ItemGroup>

          {/* Horizontal Line */}
          <hr style={{ margin: "8px 0", border: "1px solid #d9d9d9" }} />

          {/* Add more menu items as needed */}

        </Menu>
      )}
    </div>
  );
}

export default SideMenu;
