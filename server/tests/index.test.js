/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

const { expect } = chai;

describe('Handle incoming homepage requests', () => {
  it('should return 200 and success message for the / route', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome to Loaner');
        done(err);
      });
  });
  it('should return a 404 for all invalid  routes', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup%')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.be.equal(
          'Sorry, such endpoint does not exist',
        );
        done(err);
      });
  });
});

describe('Handle incoming versioned homepage requests', () => {
  it('should return 200 and success message for the /api/v1 route', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome to Loaner API Version 1');
        done(err);
      });
  });
});