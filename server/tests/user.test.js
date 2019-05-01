/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

const { expect } = chai;

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
