import { createContext, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

export const BasketContext = createContext();

export function BasketContextProvider({ children }) {
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) || [],
  );

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  /*
  برای این که ما سبد خرید رو در لوکال استورج ذخیره کنیم میایم  با یوز افکت 
  سبد خرید رو زیر نظر میگیریم که هر تغییری که در آن ایجاد شد مثلا حدف از آرایه یا اضافه به آرایه
  یا آپدیت یا هر جیز دیگر بیاد اون آرایه رو در لوکال استورج ست یا ذخیره کنه که
  با رفرش صفحه یا بسته شدن صفحه نپره حالا برای نمایش اون آرایه میایم اونو پارس میکنیم در متغیر 
  و گت آیتم میکنیم و نمایش میدهیم آرایه رو و باید توجه داشت که لوکال استورج به صورت کی ولیو هست که مقدارش به 
  صورت استرینگ ذخیره میشه پس باید تبدیل به استرینگ کنیم سپس اونو موقع گرفتن از جالت استرینگ دربیاریم
  با پارس کردن 
  */

  function addtobasket(product) {
    if (![...basket].find((mahsul) => mahsul.name == product.name)) {
      Swal.fire({
        title: "محصول به سبد اضافه شد",
        icon: "success",
      });
      return setBasket([...basket, product]);
    } else {
      Swal.fire({
        title: "محصول به سبد اضافه شد",
        icon: "success",
      });
      setBasket(
        basket.map((item) => {
          return item.name == product.name
            ? { ...item, tedad: item.tedad + 1 }
            : item;
        }),
      );
    }
  }

  /*
   تمامی عملیات اضافه حذف مجموع سبد خرید و هرچی مربوط به سبد خرید هست را در 
   کانتکست یا استور انجام میدهیم و فقط در صفحه سبد خرید نمایش می دهیم
   چون فانکشن های تغییر متغیر باید در کانتکست ما باشد و نباید محاسباتی
   روی متغیر یا آرایه در صفحه سبد خرید انجام بدهیم چون کانتکست استور ما هست
   و اینجا متغیر ذخیره میشه آپدیت هاش و فقط بقیه صفحه ها باید متغیر را دریافت کنیم و نمایش 
   دهیم
   */
  const total = useMemo(() => {
    return basket.reduce((acc, curr) => {
      return acc + curr.price * curr.tedad;
    }, 0);
  }, [basket]);

  function deleteproduct(id) {
    setBasket(basket.filter((mahsul) => mahsul.id !== id));
  }
  return (
    <BasketContext.Provider
      value={{ basket, addtobasket, total, deleteproduct }}
    >
      {children}
    </BasketContext.Provider>
  );
}
