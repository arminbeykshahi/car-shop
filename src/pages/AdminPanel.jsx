import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DarkContext } from "../store/DarkContext";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(true);

  const { isdark } = useContext(DarkContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setProducts(response.data);
        setPending(false);
      })
      .catch((error) => {
        if (error) {
          setError(true);
        }
      });
  }, []);

  function deletepost(id) {
    axios.delete(`http://localhost:3000/posts/${id}`);

    setProducts(products.filter((product) => product.id !== id));
  }

  return (
    <div
      className={
        isdark == false
          ? "flex justify-center mt-10 mb-10 rtl"
          : "flex justify-center mt-10 mb-10 rtl bg-blue-950 text-white"
      }
    >
      {error && <span>خطا در گرفتن دیتا ...</span>}
      {pending && <span>در حال گرفتن دریتا ...</span>}

      <table className="table-auto border border-gray-300 border-collapse text-center w-[80%]">
        <thead>
          <tr>
            <th className="border border-gray-300">نام</th>
            <th className="border border-gray-300">عکس</th>
            <th className="border border-gray-300">تعداد</th>
            <th className="border border-gray-300">قیمت</th>
            <th className="border border-gray-300">حذف</th>
            <th className="border border-gray-300">ویرایش</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, id) => {
            return (
              <tr key={id}>
                <td className="border border-gray-300">{product.name}</td>
                <td className="flex justify-center border border-gray-300">
                  <img className="w-8 h-8" src={product.image} alt="" />
                </td>
                <td className="border border-gray-300">{product.tedad}</td>
                <td className="border border-gray-300">{product.price}</td>
                <td className="border border-gray-300">
                  <button
                    onClick={() => deletepost(product.id)}
                    className="w-[85%]  bg-red-600 rounded-md text-white text-center p-2 cursor-pointer"
                  >
                    حذف
                  </button>
                </td>
                <td className="border border-gray-300 p-1">
                  <Link
                    to={`/adminpanel/post/${product.id}`}
                    className="w-full bg-green-600 rounded-md text-white p-2"
                  >
                    ویرایش
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
