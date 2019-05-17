import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';
import users from './models/userModels';
import loans from './models/loanModels';

chai.use(chaiHttp);

dotenv.config();

const { expect } = chai;

let adminToken;
let userToken;
const { validUser, adminLogin, verified } = users;
const {
  validLoan,
  excessTenor,
  invalidTenor,
  lowAmount,
  excessAmount,
  wrongStatus,
  validStatus,
  validAmount,
  incorrectAmount,
  excessRepayAmount,
  invalidAmount,
  zeroAmount,
} = loans;

// POST Loan Applications
describe('POST Loan Apllications', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(adminLogin)
      .send({ status: 'verified' })
      .end((err, res) => {
        adminToken = res.body.data.token;
        done(err);
      });
  });
  before((done) => {
    chai
      .request(app)
      .patch('/api/v1/users/anthony2@gmail.com/verify')
      .set('x-access-token', `${adminToken}`)
      .send(verified)
      .end((err, res) => {
        done(err);
      });
  });
  it('should create a new loan application if all inputs are correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(validLoan)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        expect(res.body.message).to.be.equal('Loan Application Created Successfully!');
        done(err);
      });
  });
  it('should return error if user already applied for a loan', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(validLoan)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('You already applied for a loan');
        done(err);
      });
  });
  it('should return error if no token is provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', '')
      .send(validLoan)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal('No token provided');
        done(err);
      });
  });
  it('should return error if wrong token is provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6InjeyRYB57')
      .send(validLoan)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.status).to.be.equal(500);
        expect(res.body.error).to.be.equal('Failed to authenticate token');
        done(err);
      });
  });
  it('should return error if tenor is greater than 12', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(excessTenor)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Loan tenor can only be between 1 and 12 months');
        done(err);
      });
  });
  it('should return error if any of the value is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(invalidTenor)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Values must be in a number format');
        done(err);
      });
  });
  it('should return error if amount is less than 5000', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(lowAmount)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Loan Amount should not be less than 5000 Naira');
        done(err);
      });
  });
  it('should return error if amount is greater than 100000', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(excessAmount)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Loan Amount should not be greater than 100000 Naira');
        done(err);
      });
  });
});

// GET All Loan Applications
describe('GET All Loans', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(adminLogin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done(err);
      });
  });

  it('should get all loan applications', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('All Loan Applications');
        done(err);
      });
  });
  it('should return error if no token is provided', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans')
      .set('x-access-token', '')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal('No token provided');
        done(err);
      });
  });
  it('should return error if wrong token is provided', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6InjeyRYB57')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.status).to.be.equal(500);
        expect(res.body.error).to.be.equal('Failed to authenticate token');
        done(err);
      });
  });
  it('should return a specific loan application', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans/1')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        done(err);
      });
  });
  it('should return error if id is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans/w')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Wrong Id Value Passed');
        done(err);
      });
  });
  it('should return error if load with that Id can not be found', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans/4')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('No loan with that Id');
        done(err);
      });
  });
});

// Approve/Reject Route
describe('PATCH Loan Status', () => {
  it('should return error if loan is not approved', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send(validAmount)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('This loan has not yet been approved');
        done(err);
      });
  });
  it('should return error if status is not approved or rejected', (done) => {
    chai
      .request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', `${adminToken}`)
      .send(wrongStatus)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Wrong status value passed');
        done(err);
      });
  });
  it('should update status if input is correct', (done) => {
    chai
      .request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', `${adminToken}`)
      .send(validStatus)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('Updated Loan Application');
        done(err);
      });
  });
  it('should return error if loan has already been approved', (done) => {
    chai
      .request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', `${adminToken}`)
      .send(validStatus)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Loan has already been approved');
        done(err);
      });
  });
  it('should return error if params id is not a number', (done) => {
    chai
      .request(app)
      .patch('/api/v1/loans/w')
      .set('x-access-token', `${adminToken}`)
      .send(validStatus)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Wrong Id Value Passed');
        done(err);
      });
  });
});

// GET Approved Loans
describe('GET Approved Loans', () => {
  it('should get loans that are approved and fully repaid', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('No loan matches the given request');
        done(err);
      });
  });
  it('should get loans that are approved and fully repaid', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        done(err);
      });
  });
  it('should return error if status is not approved', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans?status=rejected&repaid=true')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('This endpoint can only return approved loans');
        done(err);
      });
  });
  it('should return error if status is not approved', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans?status=approved&repaid=not-true')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Repaid value can only be true or false');
        done(err);
      });
  });
});

// POST Repayment Record
describe('POST Repayment Record', () => {
  it('should create a loan repayment record if input is correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send(validAmount)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        expect(res.body.message).to.be.equal('Loan repayment record created succesfully');
        done(err);
      });
  });
  it('should create a loan repayment record if input is correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send(incorrectAmount)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal(
          'Paid amount can only be in multiples of the monthlyInstallment',
        );
        done(err);
      });
  });
  it("should return error if amount exceeds client's balance", (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send(excessRepayAmount)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal("Paid amount should not exceed the client's balance");
        done(err);
      });
  });
  it('should return error if paid amount is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send(invalidAmount)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Paid amount must be in a number format');
        done(err);
      });
  });
  it('should return error if paid amount is zero', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send(zeroAmount)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Paid amount should be more than zero');
        done(err);
      });
  });
  it('should return error if no paid amount', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Paid amount has to specified');
        done(err);
      });
  });
});

// GET Loan Repayment Record
describe('GET Loan Repayment Record', () => {
  it('should retrieve loan repayment record', (done) => {
    chai
      .request(app)
      .get('/api/v1/loans/1/repayments')
      .set('x-access-token', `${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        done(err);
      });
  });
});
