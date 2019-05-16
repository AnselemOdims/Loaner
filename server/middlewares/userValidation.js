import User from '../models/users';
import Helpers from '../utils/helpers';
import db from '../models/db';

const { users } = db;

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
      firstName, lastName, address, phoneNumber,
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
    } else if (!phoneNumber || !validate.phonenumber.test(phoneNumber)) {
      error = 'A valid phonenumber must be included';
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
    let error;
    const { email } = req.body;
    const singleUser = await Helpers.findByMail(email, users);
    if (singleUser) {
      error = 'User with the email already exists';
    }
    if (error) {
      return res
        .status(409)
        .json({ status: 409, error });
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
    const user = await Helpers.findByMail(email, users);
    if (!user) {
      return res
        .status(400)
        .json({ status: 400, error: 'Sorry, the email/password you provided is incorrect' });
    }
    const verifyPassword = await Helpers.verifyPassword(password, user.password);
    if (!verifyPassword) {
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
    let error;
    const validate = await Helpers.validate();
    const { email } = await req.params;
    const { status } = await req.body;
    const arr = ['verified', 'unverified'];
    const user = await Helpers.findByMail(email, users);
    if (!email || !validate.email.test(email)) {
      error = 'The email you provided is not valid';
    } else if (!user) {
      error = 'No User with that email';
    } else if (!arr.includes(status)) {
      error = 'The status can either be verified or unverified';
    }
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error });
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
    const user = await Helpers.findById(Number(id), users);
    if (Number.isNaN(Number(id))) {
      return res
        .status(400)
        .json({ status: 400, error: 'Wrong Id Value Passed' });
    }
    if (!user) {
      return res
        .status(400)
        .json({ status: 400, error: 'No User with that Id in the database' });
    }
    return next();
  }
}

export default UserValidation;
