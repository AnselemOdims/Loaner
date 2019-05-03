import User from '../models/users';
import Helpers from '../utils/helpers';

/**
 * @class UserController
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports UserController
 */
class UserController {
  /**
   * @method userRegister
   * @description Create a new user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON API Response
   */
  static async userRegister(req, res) {
    const { email } = req.body;
    const user = await User.createUser(req.body);
    const { id, isAdmin } = user;
    const userToken = await Helpers.generateToken({ id, email, isAdmin });
    return res.status(201).json({
      status: 201,
      token: userToken,
      message: 'User Registration Successful!',
      data: user,
    });
  }

  /**
   * @method userLogin
   * @description Logs in an already existing user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON API Response
   */
  static async userLogin(req, res) {
    const { email } = await req.body;
    const user = await User.findByMail(email);
    const userToken = await Helpers.generateToken({ user });
    return res.status(200).json({
      status: 200,
      token: userToken,
      message: 'Login Successful!',
      data: user,
    });
  }

  /**
   * @method verifyUser
   * @description Verifies the user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} -JSON API Response
   */
  static async verifyUser(req, res) {
    const { email } = req.params;
    const { status } = req.body;
    const verifiedUser = await User.verify(email, status);
    return res.status(200).json({
      status: 200,
      message: 'User Verification Successful!',
      data: verifiedUser,
    });
  }

  /**
   * @method getUsers
   * @description - Gets all users
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - All users
   */
  static async getUsers(req, res) {
    const users = await User.getAll();
    return res.status(200).json({ status: 200, message: 'All Users', data: users });
  }
}

export default UserController;
