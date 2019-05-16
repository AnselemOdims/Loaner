import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

const secretKey = process.env.SECRET_KEY;
const adminPassword = process.env.ADMIN_PASSWORD;

/**
 * @class Helpers
 * @description Specifies the helper methods
 * @exports Helpers
 */
class Helpers {
  /**
  * @method findById
  * @description - Method for getting a data by Id
  * @param {Number} value - The data's id
  * @param {object} db - The database
  * @returns {object} - The data with the Id
  */
  static async findById(value, db) {
    const data = await db.find(({ id }) => id === value);
    return data;
  }

  /**
   * @method findByMail
   * @description - method for finding a data by email
   * @param {string} mail - The data's email
   * @param {object} db - The database
   * @returns {object} - The data that matches that passed email
   */
  static async findByMail(mail, db) {
    const data = db.find(({ email }) => email === mail);
    return data;
  }

  /**
   * @method findAll
   * @description - method to get all users
   * @param {object} db - The database
   * @returns {object} - All users
   */
  static async findAll(db) {
    return db;
  }
  
  /**
   * @method hashPassword
   * @description Hashes User password using bcrypt
   * @returns The hashed password
   */
  static async hashPassword(password) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }

  /**
   * @method adminPassword
   * @description Hashes the Admin password using bcrypt
   * @returns {string} - Hashed password
   */
  static adminPassword() {
    const hashed = bcrypt.hashSync(adminPassword, 10);
    return hashed;
  }

  /**
   * @method verifyPassword
   * @description Verifies request password against hashed user password
   * @param {string} password - The request password
   * @param {string} hash - The hashed password
   */
  static async verifyPassword(password, hash) {
    const verified = await bcrypt.compare(password, hash);
    return verified;
  }

  /**
   * @method validate
   * @description Validates User Input using Regex
   */
  static validate() {
    return {
      name: /^[a-zA-Z]+$/,
      email: /^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
      phonenumber: /^\+[0-9]{13}$|^[0-9]{11}$/,
      address: /^[A-Za-z0-9\.\-\s\,]*$/,
    };
  }

  /**
   * @method generateToken
   * @description - Generates User Token
   * @param {object} payload - The User's Claims
   * @returns {string} - Generated Token
   */
  static async generateToken(payload) {
    const token = await jwt.sign(payload, secretKey, { expiresIn: '1 week' });
    return token;
  }

  /**
   * @method verifyToken
   * @description Verifies the user token
   * @param {string} token - The generated token
   * @returns {object} - The decoded payload
   */
  static async verifyToken(token) {
    let decoded = {};
    try {
      decoded.payload = await jwt.verify(token, secretKey);
    } catch (error) {
      decoded = {
        error: error.message,
      };
    }
    return decoded;
  }
}

export default Helpers;
