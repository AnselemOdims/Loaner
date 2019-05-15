import Repayments from '../models/repayment';
import Loans from '../models/loan';

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
    const { id } = req.params;
    const loan = await Loans.getOne(Number(id));
    const { balance, status, monthlyInstallment } = loan;
    if (paidAmount <= 0) {
      return res
        .status(400)
        .json({ status: 400, error: 'Paid amount should be more than zero' });
    }
    if (!paidAmount) {
      return res
        .status(400)
        .json({ status: 400, error: 'Paid amount has to specified' });
    }
    if (Number.isNaN(Number(paidAmount))) {
      return res
        .status(400)
        .json({ status: 400, error: 'Paid amount must be in a number format' });
    }
    if (status !== 'approved') {
      return res
        .status(400)
        .json({ status: 400, error: 'This loan has not yet been approved' });
    }
    if (paidAmount > balance) {
      return res
        .status(400)
        .json({ status: 400, error: "Paid amount should not exceed the client's balance" });
    }
    if (balance === 0) {
      return res
        .status(400)
        .json({ status: 400, error: 'Client has completed loan repayment' });
    }
    if (paidAmount % monthlyInstallment !== 0) {
      return res.status(400).json({
        status: 400,
        error: 'Paid amount can only be in multiples of the monthlyInstallment',
      });
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
    const { id } = req.params;
    const loan = await Loans.getOne(Number(id));
    const { email } = loan;
    if (email !== req.user.email) {
      return res
        .status(403)
        .json({ status: 403, error: 'You are not authorized to view this record' });
    }
    return next();
  }
}

export default RepaymentValidation;
