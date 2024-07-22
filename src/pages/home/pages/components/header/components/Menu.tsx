import React from "react";
import { Layout, Menu, Input, Button, Space } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Menu.scss";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

const AppMenu: React.FC = () => {
  return (
    <Header className="app-menu">
      <div className="app-menu__logo">Exclusive</div>
      <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" >
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
        <Menu.Item key="signup">
          <Link to="/sigup" style={{ textDecoration: "none" }}>
            Sig Up
          </Link>
        </Menu.Item>
      </Menu>
      <Search
        placeholder="What are you looking for?"
        onSearch={(value) => console.log(value)}
        style={{ width: 200 }}
      />
      <Space className="app-menu__icons">
        <Button icon={<HeartOutlined />} />
        <Button icon={<ShoppingCartOutlined />} />
        <Button icon={<UserOutlined />} />
      </Space>
    </Header>
  );
};

export default AppMenu;
