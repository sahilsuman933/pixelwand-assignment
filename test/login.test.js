import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /auth/login', () => {
  it('should login a user with valid credentials', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'test@123',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('email').equal('test@gmail.com');
        expect(res.body).to.have.property('accessToken').to.be.a('string');
        done();
      });
  });

  it('should not login a user with invalid credentials', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'invalidpassword',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body)
          .to.have.property('error')
          .equal('Authentication failed');
        done();
      });
  });
});
