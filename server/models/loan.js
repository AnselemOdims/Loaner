import UserModel from './users';

/**
 * @class - Loan
 * @description specifies which method is used by the loan controller
 * @exports Loan
 */
class Loan {
  constructor() {
    this.loans = [];
  }

  /**
   * @method createLoans
   * @description - Creates a new loan application
   * @param {object} data - The Request data Object
   * @param {object} payload - The User payload
   * @returns {object} - The new loan application
   */
  async createLoans(data, payload) {
    const { email } = payload;
    const user = await UserModel.findByMail(email);
    const { firstName, lastName } = user;
    const { tenor, amount } = data;
    const interest = 0.05 * amount;
    const balance = amount + interest;
    const monthlyInstallment = balance / tenor;
    const loan = {
      loanId: this.loans.length + 1,
      firstName,
      lastName,
      email,
      tenor,
      amount,
      monthlyInstallment,
      repaid: false,
      status: 'pending',
      balance,
      interest,
      createdOn: new Date(),
    };
    this.loans.push(loan);
    return loan;
  }

  /**
   * @method getAll
   * @description - Retrieves all users
   * @returns {object} - All loan applications
   */
  async getAll() {
    const loans = await this.loans;
    return loans;
  }

  /**
   * @method getOne
   * @param {Number} id - The Loan Id
   * @returns {object} - The Specific loan
   */
  async getOne(id) {
    const loan = await this.loans.find(({ loanId }) => loanId === id);
    return loan;
  }

  /**
   * @method updateStatus
   * @description - Updates loan status
   * @param {Number} id - The Loan ID
   * @param {object} data - The  Loan Status
   * @returns {object} - The Updated Loan
   */
  async updateStatus(id, data) {
    const loan = await this.getOne(id);
    loan.status = data;
    return loan;
  }
}

export default new Loan();
