import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";

import Footer from "./components/Footer";
import Purchase from "./pages/purchase";

import { BasketContextProvider } from "./store/basketContext";
import Error404 from "./pages/Error404";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { LoginContextProvider } from "./store/LoginContext";
import AdminPanel from "./pages/AdminPanel";
import AdminPanelEdit from "./pages/AdminPanelEdit";
import Scroll from "./components/Scroll";
import { DarkContextProvider } from "./store/DarkContext";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <BasketContextProvider>
          <DarkContextProvider>
            <LoginContextProvider>
              <Header />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/purchase" element={<Purchase />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                  <Route path="/adminpanel" element={<AdminPanel />} />
                  <Route
                    path="adminpanel/post/:id"
                    element={<AdminPanelEdit />}
                  />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </div>
              <Scroll />
              <Footer />
            </LoginContextProvider>
          </DarkContextProvider>
        </BasketContextProvider>
      </BrowserRouter>
    </div>
  );
}
