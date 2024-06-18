import "./App.css";
import { UserApi } from "./api/UserApi";
import AdminApp from "./components/MainApp/AdminApp";
import UserApp from "./components/MainApp/UserApp";

const App = () => {
  const user = UserApi.getInstance().LogedUser;
  return user && user.role === "admin" ? <AdminApp /> : <UserApp />;
};

export default App;
