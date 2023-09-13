import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.style.scss";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
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
            <h1 className="-ml-1 text-white text-4xl">DT</h1>
            <h1 className="-ml-1 text-[#ffffffad] text-2xl">{role}</h1>
          </div>

          <div className="mt-24">
            {menuToBeRendered.map((menu, index) => {
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
              <i className="ri-logout-circle-line"></i>
              {!collapsed && (
                <Link to="/login" className="text-white no-underline ml-5">
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
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

            <div className="flex items-center pr-10">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line text-xl text-black cursor-pointer "></i>
              </Badge>

              <Link className="no-underline ml-3" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-md h-[92vh] shadow-sm shadow-slate-400 p-10 pt-1 pb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
