import Helpers from '../utils/helpers';
/**
 * @class User
 * @description specifies which function is used by the user controller
 * @exports User
 */
class User {
  constructor() {
    this.users = [
      {
        id: 1,
        firstName: 'Bayo',
        lastName: 'Admin',
        email: 'bayo@admin.com',
        password: Helpers.adminPassword(),
        isAdmin: true,
      },
    ];
  }

  /**
   * @method createUser
   * @description A model for creating new users
   * @returns {object} - The created user information
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

  /**
   * @method findByMail
   * @description - method for finding a user by their email
   * @returns {object} - The user that matches that passed email
   */
  async findByMail(mail) {
    const user = this.users.find(user => user.email === mail);
    return user;
  }

  /**
   * @method verify
   * @description - method used to verify the user
   * @param {string} mail - The User's email
   * @param {string} data - The Request status
   * @returns {object} - The verified user
   */
  async verify(mail, data) {
    const user = await this.findByMail(mail);
    user.status = data;
    return user;
  }

  /**
   * @method getAll
   * @description - method to get all users
   * @returns {object} - All users
   */
  async getAll() {
    return this.users;
  }
}

export default new User();
