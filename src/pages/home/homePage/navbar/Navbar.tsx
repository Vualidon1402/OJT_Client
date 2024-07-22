import React, { useState } from "react";
import "./Navbar.scss";
interface NavItem {
  name: string;
  subCategories?: {
    [key: string]: string[];
  };
}

const navItems: NavItem[] = [
  {
    name: "Woman's Fashion",
    subCategories: {
      "Thương hiệu": [
        "Mac",
        "ASUS",
        "Lenovo",
       
      ],
      "Phân khúc giá": [
        "Dưới 10 triệu",
        "Từ 10 - 15 triệu",
        "Từ 15 - 20 triệu",
        "Từ 20 - 25 triệu",
        "Từ 25 - 30 triệu",
      ],
    },
  },
  {
    name: "Men's Fashion",
    subCategories: {
      "Thương hiệu": [
        "Mac",
        "ASUS",
        "Lenovo",
        "Dell",
        "HP",
        "Acer",
        "LG",
        "Huawei",
        "MSI",
        "Gigabyte",
        "Vaio",
        "Microsoft Surface",
      ],
    },
  },
  {
    name: "Electronics",
  },
  {
    name: "Home & Lifestyle",
   
  },
  {
    name: "Medicine",
  },
  {
    name: "Sports & Outdoors",
  },
  {
    name: "Baby's & Toys",
  },{
    name: "Groceries & Pets",
  },{
    name : "Health & Beauty",
  }
  
];

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <nav className="navbars">
      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`nav-item ${activeItem === index ? "active" : ""}`}
            onMouseEnter={() => setActiveItem(index)}
            onMouseLeave={() => setActiveItem(null)}
          >
            {item.name}
            {activeItem === index && item.subCategories && (
              <div className="sub-menu">
                {Object.entries(item.subCategories).map(
                  ([category, items], catIndex) => (
                    <div key={catIndex} className="sub-menu-column">
                      <h4>{category}</h4>
                      <ul>
                        {items.map((subItem, itemIndex) => (
                          <li key={itemIndex}>{subItem}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
