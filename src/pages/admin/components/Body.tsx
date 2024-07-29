import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
    menuTemp.push({ title: "Brand", url: "brand" });
    menuTemp.push({ title: "Color", url: "color" });
    menuTemp.push({ title: "Config", url: "config" });
    menuTemp.push({ title: "Banner", url: "banner" });
    menuTemp.push({ title: "Voucher", url: "voucher" });
    menuTemp.push({ title: "DiscountEvent", url: "discountevent" });

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
