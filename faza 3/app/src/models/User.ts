// user class should have username, password, firtName, lastName, adress and phone number
class User {
  constructor(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    role: string
  ) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }

  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public address: string;
  public phoneNumber: string;
  public role: string;
}

export default User;
