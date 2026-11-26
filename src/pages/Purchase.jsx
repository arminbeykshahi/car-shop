import React, { useContext } from "react";
import { BasketContext } from "../store/basketContext";
import { DarkContext } from "../store/DarkContext";

export default function Purchase() {
  const { basket, total, deleteproduct } = useContext(BasketContext);
  const { isdark } = useContext(DarkContext);

  return (
    <div
      className={
        isdark == false
          ? "rtl flex justify-center"
          : "rtl flex justify-center bg-blue-950 text-white"
      }
    >
      {basket.length == 0 ? (
        <span className="mt-10 mb-10">سبد خرید خالی می باشد</span>
      ) : (
        <table className="table-auto border border-gray-300  border-collapse text-center w-[70%] mt-10 mb-10 ">
          <thead>
            <tr>
              <th className="border border-gray-300">نام</th>
              <th className="border border-gray-300">عکس</th>
              <th className="border border-gray-300">تعداد</th>
              <th className="border border-gray-300">
                <span>قیمت</span>(تومان){" "}
              </th>
              <th className="border border-gray-300">حذف</th>
            </tr>
          </thead>
          <tbody>
            {basket.map((product, id) => {
              return (
                <tr key={id}>
                  <td className="border border-gray-300">{product.name}</td>
                  <td className="flex justify-center text-center border border-gray-300">
                    <img src={product.image} className="w-14 h-14" alt="" />
                  </td>
                  <td className="border border-gray-300">{product.tedad}</td>
                  <td className="border border-gray-300">
                    {product.price * product.tedad}
                  </td>
                  <td className="border border-gray-300">
                    <button
                      onClick={() => deleteproduct(product.id)}
                      className="p-3 w-[85%] h-[70%] rounded-md bg-red-600 text-white text-center cursor-pointer"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <span>
            مجموع :<span>{total}</span>
          </span>
        </table>
      )}
    </div>
  );
}
