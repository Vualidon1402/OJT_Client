import React from "react";
import { Layout, Menu, Input, Button, Space } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SearchOutlined,
} from "@ant-design/icons";
import "./Menu.scss";

const { Header } = Layout;
const { Search } = Input;

const AppMenu: React.FC = () => {
  return (
    <Header className="app-menu">
      <div className="app-menu__logo">Exclusive</div>
      <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="contact">Contact</Menu.Item>
        <Menu.Item key="about">About</Menu.Item>
        <Menu.Item key="signup">Sign Up</Menu.Item>
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
