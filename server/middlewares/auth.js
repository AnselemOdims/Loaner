import Helper from '../utils/helpers';

/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */
class AuthenticateUser {
  /**
   * @method verifyAdmin
   * @description Verifies the token provided by the Admin
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON response object
   */
  static async verifyAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ status: 401, error: 'No token provided' });
    }
    const decoded = await Helper.verifyToken(token);
    if (decoded.error) {
      return res.status(500).json({ status: 500, error: 'Failed to authenticate token' });
    }
    const { isAdmin } = decoded.payload;
    if (isAdmin === false) {
      return res.status(403).json({
        status: 403,
        error: 'Access to this endpoint denied',
      });
    }
    return next();
  }
}

export default AuthenticateUser;
