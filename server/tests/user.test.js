/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import users from './models/userModels';

chai.use(chaiHttp);

const { expect } = chai;
let adminToken;
const {
  valid,
  emptyFirstName,
  emptyLastName,
  incompleteFirstName,
  incompleteLastName,
  emptyEmail,
  emptyPassword,
  emptyAddress,
  shortPassword,
  invalidFirstName,
  invalidLastName,
  invalidEmail,
  login,
  emptyLoginEmail,
  emptyLoginPassword,
  incompleteLoginPassword,
  invalidLoginEmail,
  incorrectPassword,
  notRegistered,
  adminLogin,
  verified,
  wrongStatus,
} = users;
// Handle Sign Up
describe('POST Sign Up Authentication', () => {
  it('should register a new user if details are correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(valid)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        expect(res.body.message).to.equal('User Registration Successful!');
        done(err);
      });
  });

  it('should return error if the user tries registering with an already registered email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(valid)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.equal(409);
        expect(res.body.error).to.equal('User with the email already exists');
        done(err);
      });
  });
  it('should return error if user tries registering with an empty firstname', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(emptyFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('A valid firstname must be included');
        done(err);
      });
  });
  it('should return error if firstname is less than 3 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(incompleteFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Firstname can not be less than 3 alphabetic characters');
        done(err);
      });
  });
  it('should return error if user tries registering with an empty lastname', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(emptyLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('A valid lastname must be included');
        done(err);
      });
  });
  it('should return error if lastname is less than 3 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(incompleteLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Lastname can not be less than 3 alphabetic characters');
        done(err);
      });
  });
  it('should return error if user tries registering with an empty email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(emptyEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('The email you provided is not valid');
        done(err);
      });
  });
  it('should return error if user tries registering with an empty password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(emptyPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('You have to provide a password');
        done(err);
      });
  });
  it('should return error if user tries registering with an empty address', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(emptyAddress)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('A valid address must be included');
        done(err);
      });
  });
  it('should return error if user tries registering with a password less than 8 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(shortPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Password length must be 8 characters and above');
        done(err);
      });
  });
  it('should return error if user tries registering with an invalid firstname', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidFirstName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('A valid firstname must be included');
        done(err);
      });
  });
  it('should return error if user tries registering with an invalid lastname', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidLastName)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('A valid lastname must be included');
        done(err);
      });
  });
  it('should return error if user tries registering with an invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('The email you provided is not valid');
        done(err);
      });
  });
});

// Login Tests
describe('POST Login Aunthentication', () => {
  it('should login a user if details are correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(login)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.equal('Log in Successful!');
        done(err);
      });
  });
  it('should return error if the email is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(emptyLoginEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('The email you provided is not valid');
        done(err);
      });
  });
  it('should return error if the password is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(emptyLoginPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('You have to provide a password');
        done(err);
      });
  });
  it('should return error if the password is not up to 8 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(incompleteLoginPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Password length must be 8 characters and above');
        done(err);
      });
  });
  it('should return error if the email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(invalidLoginEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('The email you provided is not valid');
        done(err);
      });
  });
  it('should return error if the provided password in incorrect', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(incorrectPassword)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Sorry, the email/password you provided is incorrect');
        done(err);
      });
  });
  it('should return error if its not a registered user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(notRegistered)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Sorry, the email/password you provided is incorrect');
        done(err);
      });
  });
});

describe('PATCH User status', () => {
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
  it('should return the verified user if details are correct', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/anthony@gmail.com/verify')
      .set('x-access-token', `${adminToken}`)
      .send(verified)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('Client has been verified successfully');
        expect(res.body.data.status).to.be.equal('verified');
        done(err);
      });
  });
  it('should return error if user is already verified', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/anthony@gmail.com/verify')
      .set('x-access-token', `${adminToken}`)
      .send(verified)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.equal(409);
        expect(res.body.error).to.be.equal('This User has already been Verified!');
        done(err);
      });
  });
  it('should return error if authorization header is incorrect', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/anthony@gmail.com/verify')
      .set('x-accss-toke', `${adminToken}`)
      .send({ status: 'verified' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal('No token provided');
        done(err);
      });
  });
  it('should return error if authorization token is empty', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/anthony@gmail.com/verify')
      .set('x-access-token', '')
      .send({ status: 'verified' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal('No token provided');
        done(err);
      });
  });
  it('should return error if a token is not authentic is passed', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/anthony@gmail.com/verify')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6InjeyRYB57')
      .send({ status: 'verified' })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.status).to.be.equal(500);
        expect(res.body.error).to.be.equal('Failed to authenticate token');
        done(err);
      });
  });
  it('should return error if email is not valid', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users//verify')
      .set('x-access-token', `${adminToken}`)
      .send({ status: 'verified' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
  it('should return error if user does not exist', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/anthon@gmail.com/verify')
      .set('x-access-token', `${adminToken}`)
      .send({ status: 'verified' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('User is not registered yet');
        done(err);
      });
  });
  it('should return error if the status is not verified', (done) => {
    chai
      .request(app)
      .patch('/api/v1/users/anthony@gmail.com/verify')
      .set('x-access-token', `${adminToken}`)
      .send(wrongStatus)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('The status can either be verified or unverified');
        done(err);
      });
  });
  it('should return all users in the database', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('Users Retrieved Successfully!');
        done(err);
      });
  });
});

describe('GET A Single User', () => {
  it('should return user if inputs are correct', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/1')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.equal('User Retrieved Successfully!');
        done(err);
      });
  });
  it('should return error if id is user is not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/100')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('No User with that Id in the database');
        done(err);
      });
  });
  it('should return error if id is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/w')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Wrong Id Value Passed');
        done(err);
      });
  });
});

describe('DELETE  A Single User', () => {
  it('should delete a user', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/anthony@gmail.com/delete')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.equal('User Deleted Successfully!');
        done(err);
      });
  });
  it('should return error if email is invalid', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/anthonygmail.com/delete')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('The email you provided is not valid');
        done(err);
      });
  });
  it('should return error if user is not registered', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/demouser@gmail.com/delete')
      .set('x-access-token', `${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('User is not registered yet');
        done(err);
      });
  });
});
