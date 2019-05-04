
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
      if (Number.isNaN(Number(values[i]))) {
        return res.status(400).json({ status: 400, error: 'Values have to be in a number format' });
      }
    }
    if (!tenor) {
      return res.status(400).json({ status: 400, error: 'A loan tenor has to be specified' });
    }
    if (!amount) {
      return res.status(400).json({ status: 400, error: 'A loan amount has to be specified' });
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
    if (Number.isNaN(Number(id))) {
      return res.status(400).json({ status: 400, error: 'Wrong Id Value Passed' });
    }
    return next();
  }
}

export default loanValidation;
