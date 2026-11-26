import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { DarkContext } from "../store/DarkContext";
import Swal from "sweetalert2";

export default function Register() {
  const { isdark } = useContext(DarkContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function createuser(data) {
    axios.post("http://localhost:3000/users", {
      name: data.name,
      password: data.password,
      age: data.age,
    });

    Swal.fire({
      title: "کاربر ایجاد شد",
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
      <form onSubmit={handleSubmit(createuser)} className="w-[35%]">
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
        <label htmlFor="age">سن : </label>
        <br />
        <select
          {...register("age", {
            validate: (value) => {
              if (value == "") {
                return "سن را وارد کنید";
              }
            },
          })}
          name="age"
          id="age"
          className="w-full p-3 rounded-md border border-gray-300"
        >
          <option value="زیر 18 سال">پایین 18 سال</option>
          <option value="بالا 25 سال">بالا 25 سال</option>
        </select>
        <br />
        <span className="text-red-600">{errors.age?.message}</span>
        <br />
        <br />
        <button
          type="submit"
          className="w-full p-3 bg-blue-400 text-white rounded-md cursor-pointer"
        >
          ثبت نام
        </button>
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
