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
    const user = await UserModel.users.find(user => user.email === email);
    const { id, firstName, lastName } = user;
    const { tenor, amount, balance } = data;
    const interest = 0.05 * amount;
    const monthlyInstallment = (amount + interest) / tenor;
    const loan = {
      loanId: this.loans.length + 1,
      userId: id,
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
}

export default new Loan();
