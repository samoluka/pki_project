// this class read user from the file and return it

import User from "../models/User";
import users from "../data/users.json";
import fs from "fs";

export class UserApi {
  private static allUsers: User[] = users;

  // find user with provided username and password from the json file on location ../../data/users and return it
  static login(username: string, password: string): User | null {
    return (
      UserApi.allUsers.find(
        (user) => user.username === username && user.password === password
      ) || null
    );
  }

  // write user to the json file on location ../../data/users
  static async register(user: User) {
    UserApi.allUsers.push(user);
  }
}
