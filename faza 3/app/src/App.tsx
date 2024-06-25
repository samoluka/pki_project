import { App as CapacitorApp } from "@capacitor/app";
import "./App.css";
import { UserApi } from "./api/UserApi";
import AdminApp from "./components/MainApp/AdminApp";
import UserApp from "./components/MainApp/UserApp";

const App = () => {
  const user = UserApi.getInstance().LogedUser;
  CapacitorApp.addListener("backButton", ({ canGoBack }) => {
    if (!canGoBack) {
      CapacitorApp.exitApp();
    } else {
      window.history.back();
    }
  });
  return user && user.role === "admin" ? <AdminApp /> : <UserApp />;
};

export default App;
