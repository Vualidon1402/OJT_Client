import { use } from "i18next";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

interface Menu {
  title: string;
  url: string;
}
export default function Body() {
  const navigator = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const menuTemp: Menu[] = [];

    menuTemp.push({ title: "Home", url: "/manager" });
    menuTemp.push({ title: "Product", url: "product" });
    menuTemp.push({ title: "Category", url: "category" });
    menuTemp.push({ title: "Order", url: "order" });
    menuTemp.push({ title: "User", url: "user" });

    setMenus(menuTemp);



  }, []);

  return (
    <>
      <div id="content">
        <div className="left">
          {menus.map((menu, index) => (
            <button
              onClick={() => {
                navigator(menu.url);
              }}
              key={index}
              className="menu_btn btn btn-primary"
            >
              {menu.title}
            </button>
          ))}
        </div>
        <div className="right">
          <Outlet />
        </div>
      </div>
    </>
  );
}
