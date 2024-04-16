import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Stack } from "@fluentui/react";
import { ColorTheme } from "./shared/Constants";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
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
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Stack>
    </Router>
  );
}

export default App;
