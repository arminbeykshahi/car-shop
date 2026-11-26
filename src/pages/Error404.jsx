import React, { useContext } from "react";
import { DarkContext } from "../store/DarkContext";

export default function Error404() {
  const { isdark } = useContext(DarkContext);
  return (
    <div
      className={
        isdark == false
          ? "flex justify-center mt-10"
          : "flex justify-center mt-10 bg-blue-950 text-white"
      }
    >
      Error404-صفحه یافت نشد
    </div>
  );
}
