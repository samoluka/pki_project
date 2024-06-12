// mobx store that contains all registered users and current loged user
// It is used to manage user state in the application
import { action, observable } from "mobx";
import { createContext } from "react";
import { UserApi } from "../api/UserApi";
import User from "../models/User";

export class UserStateStore {
  @observable
  currentUser: User | null = null;

  @action
  async login(username: string, password: string): Promise<boolean> {
    const user = UserApi.login(username, password);
    if (user) {
      this.currentUser = user;
      console.log("User logged in", user);
      return true;
    }
    return false;
  }

  async register(user: User): Promise<void> {
    await UserApi.register(user);
  }

  @action
  logout() {
    this.currentUser = null;
  }

  constructor() {
    // read user from local storage
    this.currentUser = JSON.parse(localStorage.getItem("user") || "null");
  }
}

// add UserStateStore to the global context
export default createContext<UserStateStore>(new UserStateStore());
