import React, { useEffect } from "react";
import "./CategoryBrowser.scss";
import apis from "@/apis";
import { CategoryModel } from "@/store/slices/product.slice";
import ProductDetails from "./components/ProductDetails";
import { useNavigate } from "react-router-dom";



export default function CategoryBrowserProps() {
  const navigator = useNavigate();
  const[category, setCategory] = React.useState<CategoryModel[]>([]);
  const [detail, setDetail] = React.useState<number|null>(null);
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await apis.category.getCategoryByStatus();
        
        setCategory(res.data);
      } catch (error) {
        console.error("Failed to fetch top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  const handleCategoryClick = async (id: number | null) => {
    setDetail(id);
    navigator(`product/${id}`);
  };
 
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
          {category.map((category, index) => (
            <div key={index} className="category-item">
              <button
                className="category-button"
                onClick={() => {
                  handleCategoryClick(category.id);
                }}
              >
                <div className="category-icon">
                  <img src={category.image} alt="" />
                </div>
              </button>
              <span className="category-name">{category.categoryName}</span>
            </div>
          ))}
        </div>

        {detail !== null && <ProductDetails id={detail} />}
      </div>
    </>
  );
}

