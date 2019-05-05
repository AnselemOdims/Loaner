import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';

chai.use(chaiHttp);

dotenv.config();

const { expect } = chai;
const adminPassword = process.env.ADMIN_PASSWORD;
let adminToken;

// POST Loan Applications
describe('POST Loan Apllications', () => {
  let userToken;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'James',
        lastName: 'Gerrard',
        email: 'james@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
      .end((err, res) => {
        userToken = res.body.token;
        done(err);
      });
  });
  it('should create a new loan application if all inputs are correct', (done) => {
    const values = {
      tenor: 12,
      amount: 50000,
      balance: 1,
    };
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(values)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        expect(res.body.message).to.be.equal('Loan Application Created Successfully!');
        done(err);
      });
  });
  it('should return error if no token is provided', (done) => {
    const values = {
      tenor: 12,
      amount: 50000,
      balance: 1,
    };
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', '')
      .send(values)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal('No token provided');
        done(err);
      });
  });
  it('should return error if wrong token is provided', (done) => {
    const values = {
      tenor: 12,
      amount: 50000,
      balance: 1,
    };
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6InjeyRYB57')
      .send(values)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.status).to.be.equal(500);
        expect(res.body.error).to.be.equal('Failed to authenticate token');
        done(err);
      });
  });
  it('should return error if tenor is greater than 12', (done) => {
    const values = {
      tenor: 15,
      amount: 50000,
      balance: 1,
    };
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(values)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Loan tenor can not be more than 12 months');
        done(err);
      });
  });
  it('should return error if any of the value is not a number', (done) => {
    const values = {
      tenor: '',
      amount: 50000,
      balance: 1,
    };
    chai
      .request(app)
      .post('/api/v1/loans')
      .set('x-access-token', `${userToken}`)
      .send(values)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Values must be in a number format');
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
      .send({
        email: 'bayo@admin.com',
        password: '1234567890',
      })
      .end((err, res) => {
        adminToken = res.body.token;
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
      .get('/api/v1/loans/3')
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
  it('should update status if input is correct', (done) => {
    chai
      .request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', `${adminToken}`)
      .send({ status: 'approved' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('Updated Loan Application');
        done(err);
      });
  });
  it('should return error if id is not a number', (done) => {
    chai
      .request(app)
      .patch('/api/v1/loans/w')
      .set('x-access-token', `${adminToken}`)
      .send({ status: 'approved' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Wrong Id Value Passed');
        done(err);
      });
  });
  it('should return error if status is not approved or rejected', (done) => {
    chai
      .request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', `${adminToken}`)
      .send({ status: 'not-approved' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Wrong status value passed');
        done(err);
      });
  });
});

// PUT Repaid route
describe('PUT Repaid', () => {
  it('should update the repaid if input is correct', (done) => {
    chai
      .request(app)
      .put('/api/v1/loans/1')
      .set('x-access-token', `${adminToken}`)
      .send({ repaid: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        done(err);
      });
  });
  it('should return error if id is not a number', (done) => {
    chai
      .request(app)
      .put('/api/v1/loans/w')
      .set('x-access-token', `${adminToken}`)
      .send({ repaid: true })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Wrong Id Value Passed');
        done(err);
      });
  });
  it('should return error if status is not approved or rejected', (done) => {
    chai
      .request(app)
      .put('/api/v1/loans/1')
      .set('x-access-token', `${adminToken}`)
      .send({ repaid: 'not-true' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Wrong value passed');
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
})

describe('POST Repayment Record', () => {
  it('should create a loan repayment record if input is correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send({ paidAmount: 20000 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        expect(res.body.message).to.be.equal('Loan repayment record created succesfully');
        done(err);
      });
  })
  it('should return error if paid amount is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send({ paidAmount: 'w' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Paid amount must be in a number format');
        done(err);
      });
  })
  it('should return error if no paid amount', (done) => {
    chai
      .request(app)
      .post('/api/v1/loans/1/repayment')
      .set('x-access-token', `${adminToken}`)
      .send({ paidAmount: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Paid amount has to specified');
        done(err);
      });
  })
})