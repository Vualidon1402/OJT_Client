import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div id="navbar_box">
      <div className="user_box">
        <Link to={"/manager"}> HOME </Link>
        {/* <img src={userStore.data?.avatarUrl} alt="avatar" /> */}
        {/* <div className="user_name">{userStore.data?.userName}</div> */}
      </div>
      <div className="authen_box"></div>
    </div>
  );
}
