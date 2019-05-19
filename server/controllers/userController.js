import queries from '../models/queries/userQueries';
import Helpers from '../utils/helpers';
import db from '../models/db';

const {
  createUser,
  getUserByEmail,
  verifyUser,
  getUserById,
  getAllUsers,
  deleteUser,
} = queries;
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
    const {
      firstName, lastName, email, address,
    } = req.body;
    const password = await Helpers.hashPassword(req.body.password);
    const values = [firstName, lastName, email, password, address];

    const result = await db.query(createUser, values);
    const user = { ...result.rows[0] };
    const token = await Helpers.generateToken({
      id: user.id,
      email,
      isAdmin: user.isadmin,
    });
    return res
      .status(201)
      .json({
        status: 201,
        message: 'User Registration Successful!',
        success: true,
        data: {
          token,
          ...user,
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
    const { email } = req.body;
    const singleUser = await db.query(getUserByEmail, [email]);
    const user = { ...singleUser.rows[0] };
    const token = await Helpers.generateToken({
      id: user.id,
      isAdmin: user.isadmin,
      email,
    });

    return res
      .status(200)
      .json({
        status: 200,
        message: 'Log in Successful!',
        success: true,
        data: {
          token,
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          address: user.address,
          status: user.status,
          isAdmin: user.isadmin,
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
    const result = await db.query(verifyUser, [email]);
    const userData = await db.query(getUserByEmail, [email]);
    const user = userData.rows[0];
    return res
      .status(200)
      .json({
        status: 200,
        message: 'Client has been verified successfully',
        success: true,
        data: {
          email: user.email,
          firstName: user.firstname,
          lastName: user.lastname,
          address: user.address,
          status: user.status,
          isAdmin: user.isadmin,
        },
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
    const users = await db.query(getAllUsers);
    const { rows } = users;
    return res.status(200).json({
      status: 200,
      message: 'Users Retrieved Successfully!',
      data: rows,
    });
  }

  /**
   * @method getAUser
   * @description - Get a single User
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON API Response
   */
  static async getAUser(req, res) {
    const { id } = req.params;
    const user = await db.query(getUserById, [id]);
    const { rows } = user;
    return res
      .status(200)
      .json({
        status: 200,
        message: 'User Retrieved Successfully!',
        data: rows,
      });
  }

  /**
   * @method deleteAUser
   * @description - Delete a single User
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON API Response
   */
  static async deleteAUser(req, res) {
    const { email } = req.params;
    const user = await db.query(deleteUser, [email]);
    return res
      .status(200)
      .json({
        status: 200,
        message: 'User Deleted Successfully!',
      });
  }
}

export default UserController;
