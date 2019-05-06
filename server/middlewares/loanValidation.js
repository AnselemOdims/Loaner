import Loans from '../models/loan';
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
    const { tenor, amount, balance } = await req.body;
    const values = [tenor, amount, balance];
    for (let i = 0; i < values.length; i++) {
      if (typeof (values[i]) !== 'number') {
        return res.status(400).json({ status: 400, error: 'Values must be in a number format' });
      }
    }
    if (tenor > 12) {
      return res.status(400).json({ status: 400, error: 'Loan tenor can not be more than 12 months' });
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
    const loan = await Loans.getOne(Number(id));
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ status: 400, error: 'Wrong Id Value Passed' });
    }
    if (!loan) {
      return res.status(400).json({ status: 400, error: 'No loan with that Id' });
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
    const values = ['approved', 'rejected'];
    if (!values.includes(status)) {
      return res.status(400).json({ status: 400, error: 'Wrong status value passed' });
    }
    return next();
  }

  /**
   * @method validateRepaid
   * @description - Validates the repaid status of the loan
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateRepaid(req, res, next) { 
    const { repaid } = await req.body;
    const arr = [false, true];
    if (!arr.includes(repaid)) {
      return res.status(400).json({ status: 400, error: 'Wrong value passed' });
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
      const loans = await Loans.getAll();
      const { status, repaid } = req.query;
      const filters = {
        status,
        repaid,
      };
      const filterKeys = Object.keys(filters);
      const loan = loans.filter(eachobj => filterKeys.every((eachKey) => {
        if (!filters[eachKey].length) return false;
        return filters[eachKey].includes(eachobj[eachKey]);
      }));
      if (loan.length === 0) {
        return res.status(400).json({ status: 400, error: 'No value in database matches the request' });
      }
      return res.status(200).json({ status: 200, data: loan });
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
        return res.status(400).json({ status: 400, error: 'This endpoint can only return approved loans' });
      }
      if (!values.includes(repaid)) {
        return res.status(400).json({ status: 400, error: 'Repaid value can only be true or false' });
      }
    }
    return next();
  }
}

export default loanValidation;
