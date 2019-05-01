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
}

export default UserController;
