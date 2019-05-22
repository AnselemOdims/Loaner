
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
    return next();
  }
}

export default RepaymentValidation;
