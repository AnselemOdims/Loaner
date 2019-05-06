import Repayments from '../models/repayment';
import LoanModel from '../models/loan';

/**
 * @class validateRepayment
 * @description - Specifies which validation method is to be used
 * @exports RepaymentValidation
 */
class RepaymentValidation {
 /**
   * @method validateRepayment
   * @description - Validates the repayment
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateRepayment(req, res, next) {
    const { paidAmount } = req.body;
    if (Number.isNaN(Number(paidAmount))) {
      return res.status(400).json({ status: 400, error: 'Paid amount must be in a number format' });
    }
    if (!paidAmount) {
      return res.status(400).json({ status: 400, error: 'Paid amount has to specified' });
    }
    return next();
  }

  /**
   * @method validateRecord
   * @decsription - Validates the repayment record 
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   */
  static async validateRecord(req, res, next) {
    let { id } = req.params;
    id = Number(id);
    const loan = await LoanModel.loans.find(loans => loans.loanId === id);
    const { userId } = loan;
    if (userId !== req.user.id) {
      return res.status(403).json({ status: 403, error: 'You are not authorized to view this record'})
    }
    return next();
  }
}

export default RepaymentValidation;