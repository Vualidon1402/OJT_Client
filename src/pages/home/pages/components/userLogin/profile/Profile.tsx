/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/store";

import apis from "@/apis";
import { showToast } from "@/util/toast";
import { fireBaseFn } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const handleCloseVerificationModal = () => setVerificationModalOpen(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [step, setStep] = useState("password"); // 'password', 'otp'
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const userStore = useSelector((store: StoreType) => {
    return store.userStore.data;
  });

  const [profile, setProfile] = useState({
    fullName: userStore?.fullName || "",
    email: userStore?.email || "",
    phone: userStore?.phone || "",
    avatar: userStore?.avatar || "",
    userName: userStore?.username || "",
    isDeleted: userStore?.deleted || false,
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
  const handlePassword = async (e: any) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      showToast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }
    if (!profile?.isDeleted) {
      showToast.error("Bạn phải xác thực email.");
      return;
    } else {
      // Proceed with form submission
      console.log("Form submitted");
    }

    try {
      await apis.user.requestPasswordChangeOtp(userStore?.id, password.current);
      showToast.success("OTP đã được gửi đến email của bạn");
      setStep("otp");
    } catch (error: any) {
      showToast.error(error.response?.data || "Đã xảy ra lỗi khi yêu cầu OTP");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      oldPassword: password.current,
      newPassword: password.new,
      otp: otp,
    };

    try {
      const response = await apis.user.changePassword(userStore?.id, data);
      console.log(response);
      showToast.success("Đổi mật khẩu thành công");
      //xoa token
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/sigin");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data);
    }
  };

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
        navigate("/sigin");
      }, 1000);
      // dispatch(userActions.updateUserInfo(response.data));
    } catch (error: any) {
      console.log(error);
      showToast.error(error.response.data.message);
    }
  };
  const handleClick = () => {
    const tokens = {
      userId: userStore?.id,
    };
    apis.user.resendOtp(tokens);
    setIsButtonVisible(false);
  };
  const handleClicks = () => {
    const tokens = {
      userId: userStore?.id,
    };
    apis.user.resendOtp(tokens);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleVerify = () => {
    const tokens = {
      userId: userStore?.id,
      otp: verificationCode,
    };
    console.log(tokens);

    const verify = async () => {
      try {
        const response = await apis.user.activateAccount(tokens);
        console.log(response.data);
        setSuccessDialogOpen(false);
        // Close the modal after verification
        handleCloseVerificationModal();
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/sigin");
        }, 1000);
      } catch (error: any) {
        console.error(error);
        setError(error.response.data);
      }
    };

    verify();
  };

  return (
    <div className="profile-container">
      <div id="fui-toast"></div>

      <div className="main-contentt">
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
              />
              <span>
                {profile?.isDeleted ? "đã xác thực" : "chưa xác thực"}
              </span>
              {!profile?.isDeleted && (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    handleClicks();
                    setVerificationModalOpen(true);
                  }}
                >
                  Xác thực
                </button>
              )}
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
        {step === "password" && (
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
                Request OTP
              </button>
            </div>
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit}>
            <h3>Enter OTP</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {message && (
                <div>
                  <p style={{ color: "red" }}>{message}</p>
                  {isButtonVisible && (
                    <button onClick={handleClick}>Resend OTP</button>
                  )}
                  {!isButtonVisible && <p>OTP sent successfully</p>}
                </div>
              )}
            </div>
            <div className="button-group">
              <button type="submit" className="save">
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>

      <Modal show={verificationModalOpen} onHide={handleCloseVerificationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Verification Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter the verification code sent to your email.</p>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              maxLength={6}
            />
            {error && (
              <div>
                <p style={{ color: "red" }}>{error}</p>
                {isButtonVisible && (
                  <button onClick={handleClick}>Resend OTP</button>
                )}
                {!isButtonVisible && <p>OTP sent successfully</p>}
              </div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseVerificationModal} variant="secondary">
            Close
          </Button>
          <Button onClick={handleVerify} variant="primary">
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
