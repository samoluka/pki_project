// mobx store that contains all registered users and current loged user
// It is used to manage user state in the application
import { observable, action } from "mobx";
import User from "../models/User";
import { UserApi } from "../api/UserApi";
import { createContext } from "react";

export class UserStateStore {
  @observable
  currentUser: User | null = null;

  @action
  async login(username: string, password: string): Promise<boolean> {
    const user = await UserApi.login(username, password);
    if (user) {
      this.currentUser = user;
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
}

// add UserStateStore to the global context
export default createContext<UserStateStore>(new UserStateStore());
