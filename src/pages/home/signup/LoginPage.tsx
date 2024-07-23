import React, { useState } from "react";
import "./LoginPage.scss";
import apis from "@/apis";
import { Login } from "@/store/slices/user.slice";
import { showToast } from "@/util/toast";

const LoginPage: React.FC = () => {
  const [errorMessages, setErrorMessages] = useState({
    loginId: "",
    password: "",
  });
  const [formData, setFormData] = useState<Login>({
    loginId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apis.user.login(formData);
      console.log("Form submitted:", response.data.message);
      showToast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err && err.response && err.response.data) {
        if (err.response.data.fieldErrors) {
          // Nếu có lỗi cụ thể cho từng trường
          setErrorMessages(err.response.data.fieldErrors);
        } else {
          // Nếu chỉ có thông báo lỗi chung
          showToast.error(err.response.data.message || "Đăng nhập thất bại");
        }
      } else {
        // Xử lý các loại lỗi khác (ví dụ: lỗi mạng)
        console.error(err);
        showToast.error("Đã xảy ra lỗi không mong muốn.");
      }
    }
  };

  return (
    <div className="login-page">
      <div id="fui-toast"></div>
      <div className="login-image">
        {" "}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDkXPo5OCCfQXwW_jQ2SQubE7iJz60NpQuMjcPw7EWrIqPEVjL"
          alt=""
        />
      </div>
      <div className="login-form">
        <h2>Đăng nhập vào Exclusive</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailOruserName">Email hoặc Số điện thoại</label>
            <input
              type="text"
              id="loginId"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
            />
            {errorMessages.loginId && (
              <p style={{ color: "red" }}>{errorMessages.loginId}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errorMessages.password && (
              <p style={{ color: "red" }}>{errorMessages.password}</p>
            )}
          </div>
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
        <button className="google-signup-btn">
          <img
            src="https://th.bing.com/th/id/OIP.JflGW8e1fT4_ttSuFTQXJwHaHj?w=196&h=200&c=7&o=5&dpr=1.3&pid=1.7"
            alt="Google"
          />
          Sign In with Google
        </button>

        <a href="#" className="forgot-password">
          Quên mật khẩu?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
