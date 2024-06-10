// this class read user from the file and return it

import User from "../models/User";
import users from "../data/users.json";
import fs from "fs";

export class UserApi {
  private static allUsers: User[] = users;

  public static LogedUser: User | null = null;

  // find user with provided username and password from the json file on location ../../data/users and return it
  static login(username: string, password: string): User | null {
    const user =
      UserApi.allUsers.find(
        (user) => user.username === username && user.password === password
      ) || null;
    // save user to local storage
    UserApi.LogedUser = user;
    // write user to browser local storage
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  // write user to the json file on location ../../data/users
  static async register(user: User) {
    UserApi.allUsers.push(user);
  }
}
