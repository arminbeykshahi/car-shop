import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginContext } from "../store/LoginContext";
import { useNavigate } from "react-router-dom";
import { DarkContext } from "../store/DarkContext";
import Swal from "sweetalert2";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { changestatus, logout } = useContext(LoginContext);
  const { isdark } = useContext(DarkContext);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  function getuser(data) {
    axios
      .get(
        `http://localhost:3000/users?name=${data.name}&password=${data.password}`,
      )
      .then((response) => {
        setUser(response.data);
        if (
          user.find(
            (person) =>
              (person.name == data.name) & (person.password == data.password),
          )
        ) {
          changestatus();
          Swal.fire({
            title: "وارد شدید",
            icon: "success",
          });
          navigate("/");
        }

        if (
          user.find(
            (person) => (person.name == "admin") & (person.password == "Admin"),
          )
        ) {
          navigate("/adminpanel");
          Swal.fire({
            title: "ادمین وارد شد",
            icon: "success",
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }

  function changetologout() {
    logout();
    navigate("/");
    Swal.fire({
      title: "خارج شدید",
      icon: "success",
    });
  }

  return (
    <div
      className={
        isdark == false
          ? "flex justify-center pt-20 rtl"
          : "flex justify-center pt-20 rtl bg-blue-950 text-white"
      }
    >
      <form onSubmit={handleSubmit(getuser)} className="w-[35%]">
        <label htmlFor="name">نام کاربری :</label>
        <br />
        <input
          placeholder="نام کاربری را وارد کنید ..."
          type="text"
          id="name"
          {...register("name", {
            validate: (value) => {
              if (value == "") {
                return " نام را وارد کنید";
              }
            },
          })}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <span className="text-red-600">{errors.name?.message}</span>
        <br />
        <br />

        <label htmlFor="password"> رمز عبور :</label>
        <br />
        <input
          {...register("password", {
            validate: (value) => {
              if (value == "") {
                return " رمز عبور را وارد کنید";
              }
              if (!/^[A-Z][a-z]{4}$/.test(value)) {
                return "الگو را رعایت کنید";
              }
            },
          })}
          placeholder="رمز عبور را وارد کنید ..."
          type="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <span className="text-red-600">{errors.password?.message}</span>
        <br />
        <br />
        <button
          type="submit"
          className="w-full p-3 bg-blue-400 text-white rounded-md cursor-pointer"
        >
          ورود
        </button>
        <br />
        <br />
        <span onClick={changetologout} className="text-red-600 cursor-pointer">
          خروج
        </span>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
