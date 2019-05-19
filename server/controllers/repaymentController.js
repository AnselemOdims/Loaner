// import Repayments from '../models/repayment';
// import db from '../models/db';
// import Helpers from '../utils/helpers';

// const { loans } = db;
// /**
//  * @class RepaymentController
//  * @description - Specifies which method handles a given request for a specific endpoint
//  * @exports RepaymentController
//  */
// class RepaymentController {
//   /**
//      * @method createRepayment
//      * @description - Creates the repayment record
//      * @param {object} req - The Request Object
//      * @param {object} res - The Response Object
//      * @returns {object} - JSON API Response
//      */
//   static async createRepayment(req, res) {
//     const { id } = req.params;
//     const { body } = req;
//     const loan = await Helpers.findById(Number(id), loans);
//     const repayment = await Repayments.create(Number(id), body);
//     if (loan.balance === 0) {
//       loan.repaid = true;
//     }
//     return res.status(201).json({ status: 201, message: 'Loan repayment record created succesfully', data: repayment });
//   }

//   /**
//    * @method getRepayment
//    * @description - Gets a specific repayment Record
//    * @param {object} req - The Request Object
//    * @param {object} res - The Response Object
//    * @returns {object} - JSON API Response
//    */
//   static async getRepayment(req, res) {
//     const { id } = req.params;
//     const repayment = await Repayments.getOne(Number(id));
//     return res.status(200).json({ status: 200, message: 'Loan Repayment History', data: repayment });
//   }
// }

// export default RepaymentController;
