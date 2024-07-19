import React from "react";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__announcement">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <a href="#">ShopNow</a>
      </div>
      <div className="navbar__language">
        <select>
          <option value="en">English</option>
          {/* Add more language options as needed */}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
