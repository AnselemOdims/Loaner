import { createRepayments } from '../models/queries/repaymentQueries';
import queries from '../models/queries/loanQueries';
import db from '../models/db';


const { getLoanById, updateBalance, updateRepaid } = queries;

/**
 * @class RepaymentController
 * @description - Specifies which method handles a given request for a specific endpoint
 * @exports RepaymentController
 */
class RepaymentController {
  /**
     * @method createRepayment
     * @description - Creates the repayment record
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} - JSON API Response
     */
  static async createRepayment(req, res) {
    const { id } = req.params;
    const paidAmount = parseInt(req.body.paidAmount, 10);
    const loanObject = await db.query(getLoanById, [id]);
    const {
      amount, paymentinstallment, status, balance,
    } = loanObject.rows[0];
    if (status !== 'approved') {
      return res
        .status(400)
        .json({ status: 400, error: 'Repayment transaction can not be created for an unapproved loan' });
    }
    const data = {
      loanId: loanObject.id,
      createdOn: new Date(),
      amount,
      monthlyInstallment: paymentinstallment,
      paidAmount,
      balance,
    };
    const newBalance = parseInt(data.balance, 10);
    // Throw an error if paidAmount is greater than the balance
    if (paidAmount > data.balance && newBalance !== 0) {
      return res.status(400).json({
        status: 400,
        error: 'The Paid Amount exceeds client debt!',
        success: false,
      });
    }
    if (paidAmount <= data.balance) {
      data.balance -= paidAmount;
      const updateLoan = await db.query(updateBalance, [data.balance, id]);
      const values = [
        data.loanId,
        data.createdOn,
        data.amount,
        data.monthlyInstallment,
        data.paidAmount,
        data.balance,
      ];
      const addRepaymentData = await db.query(createRepayments, values);
      // Change repaid to true when balance is equal to zero
      if (data.balance === 0) {
        const updateStatus = await db.query(updateRepaid, [id]);
        return res.status(201).json({
          status: 201,
          message: 'Client has repaid loan fully!',
          data,
        });
      }
    }
    return res.status(200).json({
      status: 200,
      data,
    });
  }
}


export default RepaymentController;
