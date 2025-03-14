import React from "react";
import { ProLayout } from "@ant-design/pro-layout";
import { ConfigProvider, Layout, Avatar, Dropdown, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  FileOutlined,
} from "@ant-design/icons";
import enUS from "antd/es/locale/en_US";

// 🏗 Define Menu Structure with Nested Items
const menuData = [
  {
    path: "/",
    name: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <UserOutlined />,
    children: [
      {
        path: "/users/list",
        name: "User List",
      },
      {
        path: "/users/roles",
        name: "User Roles",
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <SettingOutlined />,
    children: [
      {
        path: "/settings/profile",
        name: "Profile Settings",
      },
      {
        path: "/settings/security",
        name: "Security Settings",
      },
    ],
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <FileOutlined />,
    children: [
      {
        path: "/reports/sales",
        name: "Sales Report",
      },
      {
        path: "/reports/inventory",
        name: "Inventory Report",
      },
    ],
  },
];

// 🧑‍💼 User Profile Dropdown
const userMenu = (
  <Menu>
    <Menu.Item key="profile">
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item key="logout">
      <Link to="/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);

const AdminLayout: React.FC = () => {
  return (
    <ConfigProvider locale={enUS}   >
      <ProLayout
        title="TEESL"
        navTheme="light"
        logo="https://preview.tabler.io/static/logo.svg"
        style={{ backgroundColor: "#001009" }}
        menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
        menuDataRender={() => menuData}
        contentStyle={{
        margin: 0,        // Remove extra margin
        padding: 0,       // Remove extra padding
        height: "100vh",  // Full viewport height
        overflow: "auto", // Enable scrolling if needed
      }}
        defaultOpenKeys={["/users/list", "/settings"]} // Opens these by default        
        rightContentRender={() => (
          <Dropdown overlay={userMenu}>
            <Avatar style={{ backgroundColor: "#1890ff", cursor: "pointer" }}>A</Avatar>
          </Dropdown>
        )}
      >
        <Layout.Content style={{ padding: "20px" }}>
          <Outlet />
        </Layout.Content>
      </ProLayout>
    </ConfigProvider>
  );
};

export default AdminLayout;
