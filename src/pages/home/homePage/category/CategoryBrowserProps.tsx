import React from "react";
import "./CategoryBrowser.scss";

interface Category {
  icon: string;
  name: string;
}

const categories: Category[] = [
  { icon: "📱", name: "Phones" },
  { icon: "💻", name: "Computers" },
  { icon: "⌚", name: "SmartWatch" },
  { icon: "📷", name: "Camera" },
  { icon: "🎧", name: "HeadPhones" },
  { icon: "🎮", name: "Gaming" },
];


export default function CategoryBrowserProps() {
  return (
    <>
      <div className="category-browser">
        <div className="category-header">
          <h2 className="category-title">Browse By Category</h2>
          <div className="category-navigation">
            <button className="nav-button">←</button>
            <button className="nav-button">→</button>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <div className="category-icon">{category.icon}</div>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

