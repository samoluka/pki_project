import { Stack } from "@fluentui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorTheme } from "../../shared/Constants";
import Home from "../Home/Home";
import Login from "../Login";
import { OrdersPage } from "../Orders/OrdersPage";
import ChangePassword from "../PersonalInfo/ChangePassword";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import NewProduct from "../Product/NewProduct";
import Product from "../Product/Product";
import { Products } from "../Products/Products";
import Register from "../Register";

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Stack
        verticalAlign="center"
        horizontalAlign="center"
        styles={{
          root: {
            width: "100vw",
            height: "100vh",
            backgroundColor: ColorTheme.COLOR_PRIMARY,
            position: "fixed",
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<OrdersPage />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Routes>
      </Stack>
    </BrowserRouter>
  );
};

export default AdminApp;
