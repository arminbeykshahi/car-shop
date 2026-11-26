import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DarkContext } from "../store/DarkContext";
import Swal from "sweetalert2";

export default function AdminPanelEdit() {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const { isdark } = useContext(DarkContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)

      .then((response) => {
        setProduct(response.data);
        setPending(false);
      })

      .catch((error) => {
        if (error) {
          setError(true);
        }
      });
  }, []);

  function getnamevalue(e) {
    setProduct({ ...product, name: e.target.value });
  }

  function getimage(e) {
    setProduct({ ...product, image: e.target.value });
  }

  function getprice(e) {
    setProduct({ ...product, price: e.target.value });
  }

  function getfeatures(e) {
    setProduct({ ...product, features: e.target.value });
  }

  async function editproduct(e) {
    e.preventDefault();
    await axios.delete(`http://localhost:3000/posts/${id}`);
    if (
      product.name &&
      product.image &&
      product.price &&
      product.features !== ""
    ) {
      Swal.fire({
        title: "محصول حذف شد",
        icon: "success",
      });
      await axios.post("http://localhost:3000/posts", {
        id: product.id,
        name: product.name,
        tedad: product.tedad,
        brand: product.brand,
        price: product.price,
        image: product.image,
        features: product.features,
      });
    }
    navigate("/adminpanel");
  }

  return (
    <div
      className={
        isdark == false
          ? "flex justify-center mt-10 rtl"
          : "flex justify-center mt-10 rtl bg-blue-950 text-white"
      }
    >
      {pending == true && <span>در حال گرفتن دیتا</span>}
      {error == true && <span>خطا در گرفتن دیتا</span>}

      <form onSubmit={editproduct} className="w-[40%]">
        <br />
        <label htmlFor="id">شماره محصول :</label>
        <br />
        <input
          className="border border-gray-300 p-3 rounded-md w-full"
          type="text"
          value={product.id}
          id="id"
          disabled
        />
        <br />
        <br />
        <label htmlFor="name">
          نام:<span className="text-red-600 ms-1">قابل تغییر</span>{" "}
        </label>
        <br />
        <input
          onChange={getnamevalue}
          className="border border-gray-300 p-3 rounded-md w-full"
          type="text"
          value={product.name}
          id="name"
        />
        <br />
        <br />
        <label htmlFor="brand"> برند :</label>
        <br />
        <input
          className="border border-gray-300 p-3 rounded-md w-full"
          type="text"
          value={product.brand}
          id="brand"
          disabled
        />
        <br />
        <br />
        <label htmlFor="image">
          آدرس عکس:<span className="text-red-600 ms-1">قابل تغییر</span>
        </label>
        <br />
        <input
          onChange={getimage}
          className="border border-gray-300 p-3 rounded-md w-full"
          type="text"
          value={product.image}
          id="image"
        />
        <br />
        <br />
        <label htmlFor="price">
          {" "}
          قیمت:<span className="text-red-600 ms-1">قابل تغییر</span>
        </label>
        <br />
        <input
          onChange={getprice}
          className="border border-gray-300 p-3 rounded-md w-full"
          type="text"
          value={product.price}
          id="price"
        />
        <br />
        <br />
        <label htmlFor="features">
          {" "}
          مشخصات:<span className="text-red-600 ms-1">قابل تغییر</span>
        </label>
        <br />
        <textarea
          value={product.features}
          onChange={getfeatures}
          className="border border-gray-300 p-3 rounded-md w-full"
          name="textarea"
          id="features"
          cols="30"
          rows="10"
        ></textarea>

        <br />
        <br />
        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded-md p-3 cursor-pointer"
        >
          ویرایش
        </button>
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
