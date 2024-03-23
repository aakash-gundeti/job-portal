export default class UserModel {
  users = [{ id: 1, name: "test", email: "a@b.com", password: "abc" }];

  getUsers() {
    return this.users;
  }

  postUser(user) {
    this.users.push(user);
  }

  authenticateUser(reqUser) {
    let { email, password } = reqUser;
    let userFound = this.users.find(
      (u) => u.email === email && u.password == password,
    );

    console.log("userFounf", userFound);
    if (userFound) {
      return userFound;
    }

    return false;
  }
}
