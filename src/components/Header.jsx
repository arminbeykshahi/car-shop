import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BasketContext } from "../store/basketContext";
import { DarkContext } from "../store/DarkContext";

export default function Header() {
  const { basket } = useContext(BasketContext);
  const [showsidebar, setShowsidebar] = useState(false);
  const { changetheme, isdark } = useContext(DarkContext);
  function namayeshsidebar() {
    setShowsidebar(true);
  }

  function closesidebar() {
    setShowsidebar(false);
  }

  function taghirtheme() {
    changetheme();
  }
  return (
    <div className="rtl">
      <div
        className={
          isdark == false
            ? "header flex justify-between items-center h-14 bg-gray-100"
            : "header flex justify-between items-center h-14 bg-blue-950 text-white"
        }
      >
        <svg
          onClick={namayeshsidebar}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-7 ms-4 block md:hidden cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <div className="links ms-4 hidden md:block">
          <ul className="list-none flex">
            <li>
              {" "}
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "bg-blue-400 text-white p-2 rounded-md"
                    : "";
                }}
                to={"/"}
              >
                صفحه اصلی
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "bg-blue-400 text-white p-2 rounded-md ms-4"
                    : "ms-4";
                }}
                to={"/register"}
              >
                ثبت نام
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-blue-400 text-white p-2 rounded-md ms-4"
                    : "ms-4";
                }}
              >
                ورود
              </NavLink>
            </li>
          </ul>
        </div>

        {isdark == false ? (
          <svg
            onClick={taghirtheme}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-7 text-black cursor-pointer ms-auto me-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        ) : (
          <svg
            onClick={taghirtheme}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-7 text-white cursor-pointer ms-auto me-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        )}

        <Link to={"/purchase"}>
          <div className="logo me-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7 me-4 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="w-4 h-4 border border-red-600 rounded-full bg-red-600 absolute -right-1 -top-1 flex justify-center items-center text-white">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>

      {showsidebar == false ? (
        ""
      ) : (
        <div className="sidebar w-[25%] h-full fixed right-0 top-0 bg-gray-200">
          <svg
            onClick={closesidebar}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7 cursor-pointer text-red-600 ms-1 mt-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <ul className="list-none text-center">
            <li className="mt-5">
              {" "}
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "bg-blue-400 text-white p-2 rounded-md"
                    : "";
                }}
                to={"/"}
              >
                صفحه اصلی
              </NavLink>
            </li>

            <li className="mt-5">
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "bg-blue-400 text-white p-2 rounded-md"
                    : "ms-4";
                }}
                to={"/register"}
              >
                ثبت نام
              </NavLink>
            </li>
            <li className="mt-5">
              <NavLink
                to={"/login"}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-blue-400 text-white p-2 rounded-md"
                    : "ms-4";
                }}
              >
                ورود
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
