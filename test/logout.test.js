import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /auth/logout', () => {
  it('should logout the current user with a valid access token', async () => {
    const loginResponse = await chai.request(app).post('/auth/login').send({
      email: 'test@gmail.com',
      password: 'test@123',
    });
    const { accessToken } = loginResponse.body;

    const logoutResponse = await chai
      .request(app)
      .post('/auth/logout')
      .set('token', accessToken);

    expect(logoutResponse).to.have.status(200);
    expect(logoutResponse.body)
      .to.have.property('message')
      .equal('Logout successful');
  });

  it('should not logout the current user with a invalid access token', async () => {
    const logoutResponse = await chai
      .request(app)
      .post('/auth/logout')
      .set(
        'token',
        '$2b$10$hgGWa4azAq0SYTSg8ai6C.y0kq0LSsY9LGxk.E2tfmdtCANf0mXv4',
      );

    expect(logoutResponse).to.have.status(404);
    expect(logoutResponse.body)
      .to.have.property('message')
      .equal('Session not found');
  });
});
