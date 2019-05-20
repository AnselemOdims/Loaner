import Helpers from '../utils/helpers';
import db from '../models/db';
import queries from '../models/queries/loanQueries';
import userQueries from '../models/queries/userQueries';

const {
  createLoan,
  getLoanByEmail,
  getAllLoans,
  getLoanById,
  queryAllLoans,
  changeLoanStatus,
  updateBalance,
  updateRepaid,
} = queries;

const { getUserByEmail } = userQueries;

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
    const { email } = req.user;
    const { tenor, amount } = req.body;

    // simulate the loan data
    const loanData = {
      interest: 0.05 * parseInt(amount, 10).toFixed(3),
      // method to get paymentInstallment
      get paymentInstallment() {
        return ((parseInt((amount), 10) + this.interest) / parseInt(tenor, 10)).toFixed(2);
      },
      // method to get balance
      get balance() {
        return (parseInt(this.paymentInstallment, 10) * parseInt(tenor, 10)).toFixed(2);
      },
      status: 'pending',
      createdOn: new Date(),
      repaid: false,
    };
    const {
      paymentInstallment, status, balance, interest, createdOn, repaid,
    } = loanData;
    // fetch details of user creating the loan application
    const user = await db.query(getUserByEmail, [email]);
    const { firstname, lastname } = user.rows[0];
    // get loan with the user's email
    const loan = await db.query(getLoanByEmail, [email]);
    // check if there is no pending loan application
    if (!loan.rows.length || loan.rows[loan.rows.length - 1].repaid === true) {
      const data = {
        firstname,
        lastname,
        email,
        tenor,
        amount,
        paymentInstallment,
        status,
        balance,
        interest,
        createdOn,
        repaid,
      };
      const values = [email, loanData.createdOn, data.tenor, data.amount, data.paymentInstallment, data.balance, data.interest];
      const addLoanData = await db.query(createLoan, values);

      const getLoan = await db.query(getLoanByEmail, [email]);
      const result = getLoan.rows.length - 1;
      const loanId = getLoan.rows[result].id;
      return res
        .status(201)
        .json({
          status: 201,
          message: 'Loan Application Created Successfully!',
          success: true,
          data: {
            loanId,
            ...data,
          },
        });
    }

    return res
      .status(409)
      .json({
        status: 409,
        error: 'You have a pending loan!',
        success: false,
      });
  }

  /**
   * @method retrieveLoans
   * @description - Retrieves All loans
   * @param {object} req - The Request Object
   * @param {object} res - the Response Object
   * @returns {object} - JSON API Response
   */
  static async retrieveLoans(req, res) {
    let { status, repaid } = req.query;
    // check if url contains the query parameters
    if (status && repaid) {
      repaid = JSON.parse(repaid);
      const values = [status, repaid];
      const result = await db.query(queryAllLoans, values);
      if (result.rows.length < 1) {
        return res
          .status(404)
          .json({
            status: 404,
            error: 'There seems to be no loan for your search',
            success: false,
          });
      }
      return res
        .status(200)
        .json({
          status: 200,
          message: 'Loan Applications Retrieved Successfully!',
          success: true,
          data: [result.rows],
        });
    }
    // if it does not contain query parameters then return all
    const retrieveLoans = await db.query(getAllLoans);
    return res
      .status(200)
      .json({
        status: 200,
        message: 'All Loan Applications Retrieved Successfully',
        success: true,
        data: [retrieveLoans.rows],
      });
  }

  /**
   * @method getLoan
   * @description - Retrieve a specific loan
   * @param {object} - The Request Object
   * @param {object} - The Response Object
   */
  static async getLoan(req, res) {
    const { id } = req.params;
    const result = await db.query(getLoanById, [id]);
    return res
      .status(200)
      .json({
        status: 200,
        data: [result.rows[0]],
      });
  }

  /**
   * @method updateStatus
   * @description - Updates the status to approved or rejected
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON API Response
   */
  static async updateStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const values = [status, id];
    const updateStatus = await db.query(changeLoanStatus, values);
    const returnData = await db.query(getLoanById, [id]);
    return res
      .status(200)
      .json({
        status: 200,
        message: 'Loan Updated Successfully',
        success: true,
        data: returnData.rows[0],
      });
  }
}


export default loanController;
