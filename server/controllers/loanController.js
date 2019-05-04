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

  /**
   * @method retrieveLoans 
   * @description - Retrieves All loans
   * @param {object} req - The Request Object
   * @param {object} res - the Response Object
   * @returns {object} - JSON API Response
   */
  static async retrieveLoans(req, res) {
    const loans = await Loans.getAll();
    return res.status(200).json({ status: 200, message: 'All Loan Appliations', data: loans });
  }

  /**
   * @method getLoan
   * @description - Retrieve a specific loan
   * @param {object} - The Request Object
   * @param {object} - The Response Object
   */
  static async getLoan(req, res) {
    const { id } = req.params;
    const loan = await Loans.getOne(Number(id));
    return res.status(200).json({ status: 200, data: loan });
  }
}

export default loanController;
