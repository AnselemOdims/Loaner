/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';

chai.use(chaiHttp);

dotenv.config();

const { expect } = chai;
const adminPassword = process.env.ADMIN_PASSWORD;

// Handle Sign Up
describe('POST Sign Up Authentication', () => {
  it('should register a new user if details are correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: 'anthony@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
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
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: 'anthony@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
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
      .send({
        firstName: '',
        lastName: 'Anwuka',
        email: 'anthony@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('A valid firstname must be included');
        done(err);
      });
  });
  it('should return error if user tries registering with an empty lastname', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Anthony',
        lastName: '',
        email: 'anthony@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('A valid lastname must be included');
        done(err);
      });
  });
  it('should return error if user tries registering with an empty email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: '',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
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
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: 'anthony1@gmail.com',
        password: '',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
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
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: 'anthony@gmail.com',
        password: '12345678',
        address: '',
        phoneNumber: '07045678932',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('A valid address must be included');
        done(err);
      });
  });
  it('should return error if user tries registering with an empty phone number', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: 'anthony@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('A valid phonenumber must be included');
        done(err);
      });
  });
  it('should return error if user tries registering with a password less than 8 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: 'anthony1@gmail.com',
        password: '123456',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
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
      .send({
        firstName: 'Ant77hony',
        lastName: 'Anwuka',
        email: 'anthony1@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
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
      .send({
        firstName: 'Anthony',
        lastName: 'An77wuka',
        email: 'anthony1@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
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
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: 'anthony1gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '07045678932',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('The email you provided is not valid');
        done(err);
      });
  });
  it('should return error if user tries registering with an invalid phonenumber', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Anthony',
        lastName: 'Anwuka',
        email: 'anthony@gmail.com',
        password: '12345678',
        address: '3 Demurin Street, Ketu',
        phoneNumber: '070456789',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('A valid phonenumber must be included');
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
      .send({
        email: 'anthony@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.equal('Login Successful!');
        done(err);
      });
  });
  it('should return error if the email is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: '12345678',
      })
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
      .send({
        email: 'anthony@gmail.com',
        password: '',
      })
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
      .send({
        email: 'anthony@gmail.com',
        password: '12345',
      })
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
      .send({
        email: 'anthony*gmail#com',
        password: '12345',
      })
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
      .send({
        email: 'anthony@gmail.com',
        password: '123452816',
      })
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
      .send({
        email: 'john@gmail.com',
        password: '123452816',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Sorry, the email/password you provided is incorrect');
        done(err);
      });
  });
});

describe('PATCH User status', () => {
  let adminToken;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'bayo@admin.com', password: `${adminPassword}` })
      .end((err, res) => {
        adminToken = res.body.token;
        done(err);
      });
  });
  it('should return the verified user if details are correct', (done) => {
    chai
      .request(app)
      .patch('/api/v1/anthony@gmail.com/verify')
      .set('x-access-token', `${adminToken}`)
      .send({ status: 'verified' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('User Verification Successful!');
        expect(res.body.data.status).to.be.equal('verified');
        done(err);
      });
  });
  it('should return error if authorization header is incorrect', (done) => {
    chai
      .request(app)
      .patch('/api/v1/anthony@gmail.com/verify')
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
      .patch('/api/v1/anthony@gmail.com/verify')
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
      .patch('/api/v1/anthony@gmail.com/verify')
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
      .patch('/api/v1//verify')
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
      .patch('/api/v1/anthon@gmail.com/verify')
      .set('x-access-token', `${adminToken}`)
      .send({ status: 'verified' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('No User with that email');
        done(err);
      });
  });
  it('should return error if user does not exist', (done) => {
    chai
      .request(app)
      .patch('/api/v1/anthony@gmail.com/verify')
      .set('x-access-token', `${adminToken}`)
      .send({ status: 'verif' })
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
        expect(res.body.message).to.be.equal('All Users');
        done(err);
      });
  });
});
