/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent } from "react";
import "./SignUpPage.scss";
import apis from "@/apis";
import { Register } from "@/store/slices/user.slice";

import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [token, setToken] = useState<number>(0);
  const handleOpenVerificationModal = () => setVerificationModalOpen(true);
  const handleCloseVerificationModal = () => setVerificationModalOpen(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    phone: "",
    username: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: Register = {
      username,
      email,
      password,
      phone,
    };
    try {
      const response = await apis.user.register(user); // Fixed syntax error here

      console.log("Đăng ký thành công:", response);
      setToken(response.data);
      setSuccessDialogOpen(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessages(error.response.data);
      } else {
        console.error("Lỗi đăng ký:", error);
      }
    }
  };
  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };
  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleVerify = () => {
    const tokens = {
      userId: token.toString(),
      otp: verificationCode,
    };

    const verify = async () => {
      try {
        const response = await apis.user.activateAccount(tokens);
        console.log(response.data);
        setSuccessDialogOpen(false);
        // Close the modal after verification
        handleCloseVerificationModal();
        navigate("/sigin");
      } catch (error: any) {
        console.error(error);
        setError(error.response.data);
      }
    };

    verify();
  };
  const handleClick = () => {
    const tokens = {
      userId: token.toString(),
    };
    apis.user.resendOtp(tokens);
    setIsButtonVisible(false);
  };

  return (
    <div className="signup-container">
      <div id="fui-toast"></div>
      <div className="signup-image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDkXPo5OCCfQXwW_jQ2SQubE7iJz60NpQuMjcPw7EWrIqPEVjL"
          alt=""
        />
      </div>
      <div className="signup-form">
        <h2>Create an account</h2>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errorMessages.username && (
            <span style={{ color: "red" }}>{errorMessages.username}</span>
          )}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessages.email && (
            <span style={{ color: "red" }}>{errorMessages.email}</span>
          )}
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errorMessages.phone && (
            <span style={{ color: "red" }}>{errorMessages.phone}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessages.password && (
            <span style={{ color: "red" }}>{errorMessages.password}</span>
          )}

          <button type="submit" className="create-account-btn">
            Create Account
          </button>
        </form>

        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
      <Modal show={successDialogOpen} onHide={handleCloseSuccessDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have successfully registered.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            href="/sigin"
            variant="primary"
          >
            Tới Login
          </Button>
          <Button variant="primary" onClick={handleOpenVerificationModal}>
            Nhập Mã Xác Minh Email
          </Button>
        </Modal.Footer>
      </Modal>
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

export default SignUpPage;
