import React, { useState, FormEvent } from "react";
import "./SignUpPage.scss";
import apis from "@/apis";
import { Register } from "@/store/slices/user.slice";
import { showToast } from "@/util/toast";


const SignUpPage: React.FC = () => {
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
      showToast.success(response.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
       
        setErrorMessages(error.response.data);
      } else {
        console.error("Lỗi đăng ký:", error);
      }
    }
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
        <button className="google-signup-btn">
          <img src="google-icon.png" alt="Google" />
          Sign up with Google
        </button>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
