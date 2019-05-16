import Helpers from '../utils/helpers';
import db from './db';

const { users } = db;
/**
 * @class User
 * @description specifies which function is used by the user controller
 * @exports User
 */
class User {
  /**
   * @method createUser
   * @description A model for creating new users
   * @returns {object} - The created user information
   */
  static async createUser(data) {
    const {
      firstName, lastName, email, password, address, phoneNumber,
    } = data;
    const hashedPassword = await Helpers.hashPassword(password);
    const userInfo = {
      id: users.length + 1,
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
    db.users.push(userInfo);
    return userInfo;
  }

  /**
   * @method verify
   * @description - method used to verify the user
   * @param {string} mail - The User's email
   * @param {string} data - The Request status
   * @param {object} storage - The storage database
   * @returns {object} - The verified user
   */
  static async verify(mail, data, storage) {
    const user = await Helpers.findByMail(mail, storage);
    user.status = data;
    return user;
  }
}

export default User;
