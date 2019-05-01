import Helpers from '../utils/helpers';
/**
 * @class User
 * @description specifies which function is used by the user controller
 * @exports User
 */
class User {
  constructor() {
    this.users = [];
  }

  /**
   * @method createUser
   * @description A model for creating new users
   * @returns The created user information
   */
  async createUser(data) {
    const {
      firstName, lastName, email, password, address, phoneNumber,
    } = data;
    const hashedPassword = await Helpers.hashPassword(password);
    const userInfo = {
      id: this.users.length + 1,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      address,
      phoneNumber,
      status: 'unverified',
      isAdmin: false,
      registered: new Date(),
    };
    this.users.push(userInfo);
    return userInfo;
  }

  async findByMail(mail) {
    const user = this.users.find(user => user.email === mail);
    return user;
  }
}

export default new User();
