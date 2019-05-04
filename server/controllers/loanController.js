import Loans from '../models/loan';

/**
 * @class loanController
 * @description - Specifies which method handles a given request for a specific endpoint
 * @exports loanController
 */
class loanController {
  /**
   * @method createLoans
   * @description - Creates a new loan application
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON API Response
   */
  static async createLoans(req, res) {
    const { body } = req;
    const loan = await Loans.createLoans(body, req.user);
    return res.status(201).json({ status: 201, message: 'Loan Application Created Successfully!', data: loan });
  }
}

export default loanController;