import Helpers from '../utils/helpers';
import db from '../models/db';

const { users, loans } = db;
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
    const user = await Helpers.findByMail(email, users);
    const { status } = user;
    if (status !== 'verified') {
      return res
        .status(400)
        .json({ status: 400, error: 'User has not yet been verified' });
    }
    const { tenor, amount } = await req.body;
    const values = [tenor, amount];
    for (let i = 0; i < values.length; i++) {
      if (Number.isNaN(Number(values[i]))) {
        return res
          .status(400)
          .json({ status: 400, error: 'Values must be in a number format' });
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
    if (loans.find(loan => loan.email === email && loan.balance > 0)) {
      return res
        .status(400)
        .json({ status: 400, error: 'You already applied for a loan' });
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
    const loan = await Helpers.findById(Number(id), loans);
    if (Number.isNaN(Number(id))) {
      return res
        .status(400)
        .json({ status: 400, error: 'Wrong Id Value Passed' });
    }
    if (!loan) {
      return res
        .status(400)
        .json({ status: 400, error: 'No loan with that Id' });
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
    const loan = await Helpers.findById(Number(id), loans);
    if (loan.status === 'approved') {
      return res
        .status(400)
        .json({ status: 400, error: 'Loan has already been approved' });
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
   * @method validateLoans
   * @description - Validates the loans url
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateLoans(req, res, next) {
    if (req.url.includes('?')) {
      const allLoans = await Helpers.findAll(loans);
      const { status, repaid } = req.query;
      const filters = {
        status,
        repaid,
      };
      const filterKeys = Object.keys(filters);
      const loan = allLoans.filter(eachobj => filterKeys.every((eachKey) => {
        if (!filters[eachKey].length) return false;
        return filters[eachKey].includes(eachobj[eachKey]);
      }));
      if (loan.length === 0) {
        return res
          .status(400)
          .json({ status: 400, error: 'No loan matches the given request' });
      }
      return res
        .status(200)
        .json({ status: 200, data: loan });
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
