/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/store";
import {  User, userActions } from "@/store/slices/user.slice";
import apis from "@/apis";
import { showToast } from "@/util/toast";
import { fireBaseFn } from "@/firebase";




const Profile: React.FC = () => {

  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => {
    return store.userStore.data;
  });

  const [profile, setProfile] = useState({
    fullName: userStore?.fullName || "",
    email: userStore?.email || "",
    phone: userStore?.phone || "",
    avatar: userStore?.avatar || "",
    userName: userStore?.username || "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };
  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      oldPassword: password.current,
      newPassword: password.new,
    };
    try {
       const response = await apis.user.changePassword(userStore?.id,data);
         console.log( response);
       showToast.success("Đổi mật khẩu thành công");
       //xoa token
        localStorage.removeItem("token");
       setTimeout(() => {
            window.location.href = "/sigin";
        }, 1000);
    } catch (error:any) {
        showToast.error(error.response.data.message);
    }
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const data = {
      fullName: target.fullName.value,
      email: target.email.value,
      phone: target.phone.value,
      avatar: await fireBaseFn.uploadToStorage(target.image.files[0]),
      userName: target.userName.value,
    };
    try {
      const response = await apis.user.updateProfile(userStore?.id, data);
      console.log(response);
      showToast.success("Cập nhật thông tin thành công");
       localStorage.removeItem("token");
       setTimeout(() => {
         window.location.href = "/sigin";
       }, 1000);
      // dispatch(userActions.updateUserInfo(response.data));
    } catch (error: any) {
      showToast.error(error.response.data.message);
    }
   
  };
  console.log(userStore);

  return (
    <div className="profile-container">
      <div id="fui-toast"></div>
      <div className="sidebar">
        <h3>Manage My Account</h3>
        <ul className="profile">
          <li className="active">My Profile</li>
          <li>Address Book</li>
          <li>My Payment Options</li>
        </ul>
        <h3>My Orders</h3>
        <ul className="profile">
          <li>My Returns</li>
          <li>My Cancellations</li>
        </ul>
        <h3>My Wishlist</h3>
      </div>
      <div className="main-content">
        <h2>Edit Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-image">
            <img src={profile.avatar} alt="" />
            <input type="file" name="image" id="image" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                placeholder="Nhập họ tên"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                // disabled
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                //ẩn ô input không cho người dùng nhập
                // disabled
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                // value={userStore?.}
                onChange={handleProfileChange}
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>
          <div className="form-group">
            <label>userName</label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={profile.userName}
              onChange={handleProfileChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
        <form onSubmit={handlePassword}>
          <h3>Password Changes</h3>
          <div className="form-group">
            <input
              type="password"
              name="current"
              placeholder="Current Password"
              value={password.current}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="new"
              placeholder="New Password"
              value={password.new}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirm"
              placeholder="Confirm New Password"
              value={password.confirm}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
