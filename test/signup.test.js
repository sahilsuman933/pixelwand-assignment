import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /auth/signup', () => {
  describe('Signup Endpoint', () => {
    it('should handle user registration', (done) => {
      const randomEmail = `sahilsuman${Math.round(
        Math.random(0, 999) * 1000,
        1,
      )}@gmail.com`;
      chai
        .request(app)
        .post('/auth/signup')
        .send({
          name: 'Sahil Suman',
          email: randomEmail,
          password: 'test@123',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('email').equal(randomEmail);
          done();
        });
    });

    it('should not register user', (done) => {
      chai
        .request(app)
        .post('/auth/signup')
        .send({
          name: 'Sahil Suman',
          email: 'test@gmail.com',
          password: 'test@123',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body)
            .to.have.property('error')
            .equal('Email already exists');
          done();
        });
    });
  });
});
