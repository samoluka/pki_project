// this class read user from the file and return it

import users from "../data/users.json";
import User from "../models/User";

export class UserApi {
  private allUsers: User[] = users;
  public LogedUser: User | null = null;

  // create a singleton class
  private static instance: UserApi;
  public static getInstance() {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }
    return UserApi.instance;
  }

  // Constructor is private to prevent instantiation
  private constructor() {
    // if there is users saved in local storage, use them
    const usersString = localStorage.getItem("users");
    if (usersString) {
      this.allUsers = JSON.parse(usersString);
    } else {
      // save the users to local storage
      localStorage.setItem("users", JSON.stringify(this.allUsers));
    }

    // if there is logged user saved in local storage, use it
    const userString = localStorage.getItem("user");
    if (userString) {
      this.LogedUser = JSON.parse(userString);
    }
  }

  public updateUser(user: User) {
    const index = this.allUsers.findIndex((u) => u.username === user.username);
    if (index !== -1) {
      this.allUsers[index] = user;
    }
    if (this.LogedUser?.username === user.username) {
      this.LogedUser = user;
    }
    // save the users to local storage
    localStorage.setItem("users", JSON.stringify(this.allUsers));
  }

  // add user to the list of users
  public async addUser(user: User) {
    this.allUsers = [...this.allUsers, user];
    // save the users to local storage
    localStorage.setItem("users", JSON.stringify(this.allUsers));
  }

  // find user with provided username and password from the json file on location ../../data/users and return it
  public login(username: string, password: string): User | null {
    const user =
      this.allUsers.find(
        (user) => user.username === username && user.password === password
      ) || null;
    // save user to local storage
    this.LogedUser = user;
    // write user to browser local storage
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  public getAllUsers() {
    return this.allUsers;
  }
}
