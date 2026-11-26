import React, { useContext } from "react";
import { DarkContext } from "../store/DarkContext";

export default function Footer() {
  const { isdark } = useContext(DarkContext);
  return (
    <div
      className={
        isdark == false
          ? "footer w-full h-full bg-gray-100 grid grid-cols-12 gap-4"
          : "footer w-full h-full bg-blue-950 grid grid-cols-12 gap-4 text-white"
      }
    >
      <div className="footer-card col-span-12 md:col-span-4 text-center mt-7">
        <h5>درباره ما</h5>
        <br />
        <hr />
        <br />
        <p>
          ما برای رفاه حال شهروندان اقدام به تولید خودرو های با کیفیت و همچنین
          فروش آنها با صورت لیزینگ کرده ایم
        </p>
      </div>
      <div className="footer-card col-span-12 md:col-span-4 text-center mt-7">
        <h5>درباره ما</h5>
        <br />
        <hr />
        <br />
        <p>
          ما برای رفاه حال شهروندان اقدام به تولید خودرو های با کیفیت و همچنین
          فروش آنها با صورت لیزینگ کرده ایم
        </p>
      </div>
      <div className="footer-card col-span-12 md:col-span-4 text-center mt-7">
        <h5>درباره ما</h5>
        <br />
        <hr />
        <br />
        <p>
          ما برای رفاه حال شهروندان اقدام به تولید خودرو های با کیفیت و همچنین
          فروش آنها با صورت لیزینگ کرده ایم
        </p>
      </div>
    </div>
  );
}
