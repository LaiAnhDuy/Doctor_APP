import React, { useState } from "react";
import { adminMenu, userMenu } from "./config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.style.scss";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu
  return (
    <div className="p-5">
      <div className="flex">
        <div
          className={`${
            collapsed
              ? "collapsed-sidebar"
              : "bg-green-800 rounded-md shadow-sm shadow-slate-400 mr-5 h-screen p-3 pl-6 w-80"
          }`}
        >
          <div className="">
            <h1 className="-ml-3 text-white text-4xl">DT</h1>
          </div>

          <div className="mt-24">
            {menuToBeRendered.map((menu, index) => {
              console.log(menu)
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={index}
                  className={`flex mt-8 text-white text-2xl ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && (
                    <Link
                      to={menu.path}
                      className="text-white no-underline ml-5"
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              );
            })}
            <div
              className={`flex mt-8 text-white text-2xl `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className='ri-logout-circle-line'></i>
              {!collapsed && (
                <Link to='/login' className="text-white no-underline ml-5">
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="content w-full">
          <div className="bg-white rounded-md shadow-sm shadow-slate-400 mb-5 h-[8vh] flex items-center justify-between">
            {collapsed ? (
              <i
                className="ri-menu-2-fill text-2xl text-black cursor-pointer pl-3"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill text-2xl text-black cursor-pointer pl-3"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="flex items-center pr-3">
              <i className="ri-notification-line text-xl text-black cursor-pointer mr-3"></i>
              <Link className="no-underline" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-md h-[92vh] shadow-sm shadow-slate-400">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
