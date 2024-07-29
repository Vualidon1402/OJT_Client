import React from 'react'
import "./profile/Profile.scss"
import { Link, Outlet } from 'react-router-dom';
import { Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';

export default function Home() {
  return (
    <>
      <div className="profile-container">
        <div id="fui-toast"></div>
        <div className="sidebar">
          <Menu mode="inline" style={{ width: 256 }}>
            <SubMenu key="account" title="Manage My Account">
              <Menu.Item key="profile">
                <Link to="/profile/user">My Profile</Link>
              </Menu.Item>
              <Menu.Item key="address-book">
                <Link to="/address-book">Address Book</Link>
              </Menu.Item>
              <Menu.Item key="payment-options">
                <Link to="/payment-options">My Payment Options</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="orders" title="My Orders">
              <Menu.Item key="returns">
                <Link to="/profile/returns">My order history</Link>
              </Menu.Item>
              <Menu.Item key="cancellations">
                <Link to="/cancellations">My Cancellations</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="wishlist">
              <Link to="/wishlist">My Wishlist</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="main-contents">
          <Outlet />
        </div>
      </div>
    </>
  );
}
