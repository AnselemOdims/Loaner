import Helpers from '../utils/helpers';
import db from '../models/db';
import queries from '../models/queries/userQueries';

const { getUserByEmail, getUserById } = queries;

/**
 * @class UserValidation
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports UserValidation
 */
class UserValidation {
  /**
   * @method validateRegisterDetails
   * @decription Validates New User Inputs
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The Next Function
   */
  static async validateRegisterDetails(req, res, next) {
    const validate = await Helpers.validate();
    let error;
    const {
      firstName, lastName, address,
    } = await req.body;
    if (!firstName || !validate.name.test(firstName)) {
      error = 'A valid firstname must be included';
    } else if (firstName.length < 3) {
      error = 'Firstname can not be less than 3 alphabetic characters';
    } else if (!lastName || !validate.name.test(lastName)) {
      error = 'A valid lastname must be included';
    } else if (lastName.length < 3) {
      error = 'Lastname can not be less than 3 alphabetic characters';
    } else if (!address || !validate.address.test(address)) {
      error = 'A valid address must be included';
    }
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error });
    }
    return next();
  }

  /**
   * @method validateDetails
   * @description Validates The email and password Details
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The Next Function
   */
  static async validateDetails(req, res, next) {
    const validate = await Helpers.validate();
    let error;
    const { email, password } = await req.body;
    if (!email || !validate.email.test(email)) {
      error = 'The email you provided is not valid';
    } else if (!password) {
      error = 'You have to provide a password';
    } else if (password.length < 8) {
      error = 'Password length must be 8 characters and above';
    }
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error });
    }
    return next();
  }

  /**
   * @method validateExistingUser
   * @description Validates Already Existing User
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The Next Function
   */
  static async validateExistingUser(req, res, next) {
    const { email } = req.body;
    const findUser = await db.query(getUserByEmail, [email]);

    // check for already existing user
    if (findUser.rowCount > 0) {
      return res
        .status(409)
        .json({
          status: 409,
          error: 'User with the email already exists',
        });
    }
    return next();
  }

  /**
   * @method validateLogin
   * @description Validates the login details
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateLogin(req, res, next) {
    const { email, password } = req.body;
    const user = await db.query(getUserByEmail, [email]);

    // check if user is registered
    if (!user.rows.length) {
      return res
        .status(400)
        .json({ status: 400, error: 'Sorry, the email/password you provided is incorrect' });
    }
    const verifyPassword = await Helpers.verifyPassword(password, user.rows[0].password);

    // check if user email and password match
    if (!user.rows[0] || !verifyPassword) {
      return res
        .status(400)
        .json({ status: 400, error: 'Sorry, the email/password you provided is incorrect' });
    }
    return next();
  }

  /**
   * @method validateStatus
   * @description Validates the request status body
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The Next Function
   */
  static async validateStatus(req, res, next) {
    const { email } = await req.params;
    const { status } = await req.body;
    const arr = ['verified'];
    const user = await db.query(getUserByEmail, [email]);

    // check if the request body is correct
    if (!arr.includes(status)) {
      return res
        .status(400)
        .json({ status: 400, error: 'The status can either be verified or unverified' });
    }

    // Check if user is already verified
    if (user.rows[0].status === 'verified') {
      return res
        .status(409)
        .json({ status: 409, error: 'This User has already been Verified!' });
    }
    return next();
  }

  /**
   * @method validateUser
   * @description validates a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateUser(req, res, next) {
    const validate = await Helpers.validate();
    const { email } = await req.params;
    const user = await db.query(getUserByEmail, [email]);
    // check if it is a valid email
    if (!email || !validate.email.test(email)) {
      return res
        .status(400)
        .json({ status: 400, error: 'The email you provided is not valid' });
    }

    // check if user is in the database
    if (!user.rows.length) {
      return res
        .status(400)
        .json({ status: 400, error: 'User is not registered yet' });
    }
    return next();
  }

  /**
   * @method validateId
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateId(req, res, next) {
    const { id } = req.params;
    // check if id is a valid number
    if (Number.isNaN(Number(id))) {
      return res
        .status(400)
        .json({ status: 400, error: 'Wrong Id Value Passed' });
    }
    const user = await db.query(getUserById, [id]);
    // check if user is in the database
    if (!user.rows.length) {
      return res
        .status(400)
        .json({ status: 400, error: 'No User with that Id in the database' });
    }
    return next();
  }
}

export default UserValidation;
