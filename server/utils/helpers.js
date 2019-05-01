import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

/**
 * @class Helpers
 * @description Specifies the helper methods
 * @exports Helpers
 */
class Helpers {
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
   * @method validate
   * @description Validates User Input using Regex
   */
  static validate() {
    return {
      name: /^[a-zA-Z]+$/,
      email: /^([A-z0-9]+)([._-]{0,1})([A-z0-9]+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
      phonenumber: /^\+[0-9]{13}$|^[0-9]{11}$/,
      address: /^([0-9]|[A-z]|[.\-_])+$/,
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

}

export default Helpers;
