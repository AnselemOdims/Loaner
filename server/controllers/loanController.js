import Loans from '../models/loan';
import Helpers from '../utils/helpers';
import db from '../models/db';

const { loans } = db;

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
    const loan = await Helpers.findAll(loans);
    return res.status(200).json({ status: 200, message: 'All Loan Applications', data: loan });
  }

  /**
   * @method getLoan
   * @description - Retrieve a specific loan
   * @param {object} - The Request Object
   * @param {object} - The Response Object
   */
  static async getLoan(req, res) {
    const { id } = req.params;
    const loan = await Helpers.findById(Number(id), loans);
    return res.status(200).json({ status: 200, message: 'Loan Retrieved Successfully', data: loan });
  }

  /**
   * @method updateStatus
   * @description - Updates the status to approved or rejected
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON API Response
   */
  static async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const loan = await Loans.updateStatus(Number(id), status);
    return res.status(200).json({ status: 200, message: 'Updated Loan Application', data: loan });
  }
}

export default loanController;
