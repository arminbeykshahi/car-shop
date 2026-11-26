import React from "react";

export default function Scroll() {
  function scrolltotop() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div>
      <div
        onClick={scrolltotop}
        className="scroll w-12 h-12 rounded-full bg-red-600 fixed right-6 bottom-6 text-center flex justify-center items-center cursor-pointer"
      >
        <span className="text-center text-white ">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
