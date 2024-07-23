import React from "react";
import { Layout, Menu, Input, Button, Space } from "antd";
import {
  CommentOutlined,
  HeartOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Menu.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "@/store";
import { Dropdown } from "react-bootstrap";

const { Header } = Layout;
const { Search } = Input;



const AppMenu: React.FC = () => {
 
  const userStore = useSelector((store: StoreType) => {
    return store.userStore;
    
  });
  console.log(userStore);

  function handleLogout() {
    // Xóa token
    localStorage.removeItem("token");

   window.location.href = "/";
  }

  return (
    <Header className="app-menu">
      <div className="app-menu__logo">Exclusive</div>
      <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home">
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link to="/contact" style={{ textDecoration: "none" }}>
            Contact
          </Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about" style={{ textDecoration: "none" }}>
            About
          </Link>
        </Menu.Item>
        {!userStore.data && (
          <>
            <Menu.Item key="sigup">
              <Link to="/sigup" style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </Menu.Item>
            <Menu.Item key="sigin">
              <Link to="/sigin" style={{ textDecoration: "none" }}>
                Sign In
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
      <Search
        placeholder="What are you looking for?"
        onSearch={(value) => console.log(value)}
        style={{ width: 200 }}
      />
      <Space className="app-menu__icons">
        <Button icon={<HeartOutlined />} />
        <Button icon={<ShoppingCartOutlined />} />
        {userStore.data && (
          // User is logged in, show Dropdown
          <Dropdown className="custom-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <Button icon={<UserOutlined />} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="profile">
                <UserOutlined /> Manage My Account
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <OrderedListOutlined /> My Order
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <ShoppingCartOutlined /> My Cancellations
              </Dropdown.Item>
              <Dropdown.Item href="#/action-4">
                <CommentOutlined /> My Reviews
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                <LogoutOutlined /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Space>
    </Header>
  );
};

export default AppMenu;
