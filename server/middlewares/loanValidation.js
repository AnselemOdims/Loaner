import db from '../models/db';
import userQueries from '../models/queries/userQueries';
import queries from '../models/queries/loanQueries';

const { getUserByEmail } = userQueries;
const { getLoanById } = queries;
/**
 * @class loanValidation
 * @description - specifies which method is used to validate routes
 * @exports loanValidation
 */
class loanValidation {
  /**
   * @method validateInputs
   * @description - Validates loan application inputs
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateInputs(req, res, next) {
    const { email } = req.user;
    const user = await db.query(getUserByEmail, [email]);
    if (user.rows.length < 1) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist in the database',
        success: false,
      });
    }
    const { tenor, amount } = await req.body;
    const values = [tenor, amount];
    for (let i = 0; i < values.length; i++) {
      if (!values[i]) {
        return res.status(400).json({ status: 400, error: 'Tenor and Amount are required' });
      }
      if (Number.isNaN(Number(values[i]))) {
        return res.status(400).json({ status: 400, error: 'Values must be in a number format' });
      }
    }

    if (tenor < 1 || tenor > 12) {
      return res
        .status(400)
        .json({ status: 400, error: 'Loan tenor can only be between 1 and 12 months' });
    }
    if (amount < 5000) {
      return res
        .status(400)
        .json({ status: 400, error: 'Loan Amount should not be less than 5000 Naira' });
    }
    if (amount > 100000) {
      return res
        .status(400)
        .json({ status: 400, error: 'Loan Amount should not be greater than 100000 Naira' });
    }

    return next();
  }

  /**
   * @method validateId
   * @description - Validates the request Id
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateId(req, res, next) {
    const { id } = await req.params;
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ status: 400, error: 'Wrong Id Value Passed' });
    }
    const loan = await db.query(getLoanById, [id]);
    if (loan.rowCount < 1) {
      return res.status(400).json({ status: 400, error: 'No loan with that Id in the database' });
    }
    return next();
  }

  /**
   * @method validateStatus
   * @description - Validates the request status
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function } next - the next function
   */
  static async validateStatus(req, res, next) {
    const { status } = await req.body;
    const { id } = req.params;
    const loan = await db.query(getLoanById, [id]);
    if (status === 'approved' && loan.rows[0].status === 'approved') {
      return res
        .status(409)
        .json({
          status: 409,
          error: 'This loan has already been approved',
          success: false,
        });
    }
    if (status === 'rejected' && loan.rows[0].status === 'approved') {
      return res
        .status(409)
        .json({
          status: 409,
          error: 'An Already Approved Loan can not be rejected',
          success: false,
        });
    }
    if (status === 'rejected' && loan.rows[0].status === 'rejected') {
      return res
        .status(409)
        .json({
          status: 409,
          error: 'This loan has already been rejected',
          success: false,
        });
    }
    const values = ['approved', 'rejected'];
    if (!values.includes(status)) {
      return res
        .status(400)
        .json({ status: 400, error: 'Wrong status value passed' });
    }
    return next();
  }

  /**
   * @method validateQuery
   * @description - Validates the query values
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateQuery(req, res, next) {
    if (req.url.includes('?')) {
      const { status, repaid } = req.query;
      const values = ['true', 'false'];
      if (status !== 'approved') {
        return res
          .status(400)
          .json({ status: 400, error: 'This endpoint can only return approved loans' });
      }
      if (!values.includes(repaid)) {
        return res
          .status(400)
          .json({ status: 400, error: 'Repaid value can only be true or false' });
      }
    }
    return next();
  }
}

export default loanValidation;
