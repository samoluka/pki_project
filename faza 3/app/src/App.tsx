import { Stack } from "@fluentui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Product from "./components/Product/Product";
import { Products } from "./components/Products/Products";
import Register from "./components/Register";
import { ColorTheme } from "./shared/Constants";

const App = () => {
  return (
    <Router>
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
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Stack>
    </Router>
  );
};

export default App;
