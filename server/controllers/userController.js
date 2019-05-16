import User from '../models/users';
import Helpers from '../utils/helpers';
import db from '../models/db';

const { users } = db;

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
      message: 'User Registration Successful!',
      data: {
        token: userToken,
        user,
      },
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
    const user = await Helpers.findByMail(email, users);
    const { id, isAdmin } = user;
    const userToken = await Helpers.generateToken({ id, email, isAdmin });
    return res.status(200).json({
      status: 200,
      message: 'Login Successful!',
      data: {
        token: userToken,
        user,
      },
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
    const verifiedUser = await User.verify(email, status, users);
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
   * @returns {object} - JSON API Response
   */
  static async getUsers(req, res) {
    const user = await Helpers.findAll(users);
    return res.status(200).json({
      status: 200,
      message: 'Users Retrieved Successfully!',
      data: user,
    });
  }

  /**
   * @method getAUser
   * @description - Get a single User
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object\
   * @returns {object} - JSON API Response
   */
  static async getAUser(req, res) {
    const { id } = req.params;
    const user = await Helpers.findById(Number(id), users);
    return res.status(200).json({
      status: 200,
      message: 'User Retrieved Successfully!',
      data: user,
    });
  }
}

export default UserController;
