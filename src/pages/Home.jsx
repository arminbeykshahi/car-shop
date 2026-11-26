import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { BasketContext } from "../store/basketContext";
import { LoginContext } from "../store/LoginContext";
import { DarkContext } from "../store/DarkContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(true);
  const [poststedad, setPoststedad] = useState("");
  const [page, setPaage] = useState(1);
  const [inputvalue, setInputvalue] = useState("");
  const [meghdar, setMeghdar] = useState("");

  const { isdark } = useContext(DarkContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?_page=${page}&_per_page=10`)

      .then((response) => {
        setPosts(response.data.data);
        setPoststedad(response.data.items);
        setPending(false);
      })

      .catch((error) => {
        if (error) {
          setError(true);
        }
      });
  }, [page]);

  const tedadpage = useMemo(() => {
    return Math.ceil(poststedad / 10);
  }, [poststedad]);

  let array = [];

  for (let index = 1; index <= tedadpage; index++) {
    array.push(index);
  }

  function getpagenumber(e) {
    setPaage(Number(e.target.innerHTML));
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function getinputvalue(e) {
    setInputvalue(e.target.value);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?name_like=${inputvalue}`)

      .then((response) => {
        setPosts(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [inputvalue]);

  function getmeghdar(e) {
    setMeghdar(e.target.value);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?brand=${meghdar}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [meghdar]);

  const { basket, addtobasket } = useContext(BasketContext);
  const { islogin } = useContext(LoginContext);

  return (
    <div
      className={
        isdark == false
          ? "flex justify-center"
          : "flex justify-center bg-blue-950 text-white"
      }
    >
      {islogin == false ? (
        <span> لطفا وارد شوید </span>
      ) : (
        <div className="rtl mt-20">
          <div className="flex justify-center">
            {pending == true && <span>درحال گرفتن دیتا ...</span>}
            {error == true && <span>آدرس سرور اشتباه است</span>}
          </div>

          <div className="flex justify-center">
            <input
              name="searchmahsul"
              onChange={getinputvalue}
              placeholder="نام محصول را وارد کنید..."
              type="text"
              className="w-[30%] p-3 border border-gray-400 rounded-md"
            />
          </div>
          <br />
          <div className=" flex justify-center">
            <div onChange={getmeghdar}>
              <label
                htmlFor="irankhodro"
                className={
                  meghdar == "irankhodro"
                    ? "border border-gray-400 p-3 cursor-pointer rounded-md bg-blue-400 text-white"
                    : "border border-gray-400 p-3 cursor-pointer rounded-md"
                }
              >
                ایرانخودرو
              </label>
              <input
                name="khodro"
                type="radio"
                id="irankhodro"
                value={"irankhodro"}
                className="hidden"
              />

              <label
                htmlFor="saipa"
                className={
                  meghdar == "saipa"
                    ? "border border-gray-400 p-3 cursor-pointer rounded-md bg-blue-400 text-white ms-2"
                    : "border border-gray-400 p-3 cursor-pointer rounded-md ms-2"
                }
              >
                سایپا
              </label>
              <input
                name="khodro"
                type="radio"
                id="saipa"
                value={"saipa"}
                className="hidden"
              />
            </div>
          </div>

          <div className="main grid grid-cols-12 container mx-auto px-4 gap-7 mt-10">
            {posts.map((post, id) => {
              return (
                <div
                  onClick={() => addtobasket(post)}
                  key={id}
                  className="card col-span-12 md:col-span-3 h-70 border border-gray-300 rounded-md cursor-pointer"
                >
                  <img src={post.image} alt="" className="w-full h-[70%]" />
                  <br />
                  <div className="w-full flex justify-between container mx-auto px-4">
                    <h5>{post.name}</h5>
                    <h5>
                      <span>{post.price}</span>
                      <span className="ms-1">تومان</span>
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
          <br />
          <br />
          <br />

          <div className="flex justify-center ltr">
            {array.map((item) => {
              return (
                <span
                  onClick={getpagenumber}
                  to={`/${item}`}
                  className={
                    page == item
                      ? " border border-gray-300 w-10 h-10 ms-2 rounded-full p-3 flex justify-center items-center bg-blue-400 text-white cursor-pointer"
                      : "border border-gray-300 w-10 h-10 ms-2 rounded-full p-3 flex justify-center items-center cursor-pointer"
                  }
                >
                  {item}
                </span>
              );
            })}
          </div>
          <br />
          {basket.map((product) => {
            return (
              <div>
                {product.name}-{product.tedad}
              </div>
            );
          })}

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
