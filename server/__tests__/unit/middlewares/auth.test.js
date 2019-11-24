import request from 'supertest';
import factory from '../../factories';

import app from '../../../src/app';

import auth from '../../../src/app/middlewares/auth';

app.post('/testAuth', auth, (req, res) => {
  res.json({ userId: req.userId });
});

describe('Auth Middleware', () => {
  it('should be call middleware without token and return an error', async () => {
    const res = await request(app)
      .post('/testAuth')
      .send({});

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Token not provided');
  });

  it('should be call middleware with a valid token and call next() with userId', async () => {
    const token = factory.getValidToken(123456);
    const res = await request(app)
      .post('/testAuth')
      .set('authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(123456);
  });

  it('should be call middleware without valid token and return an error', async () => {
    const token = 'invalidToken';
    const res = await request(app)
      .post('/testAuth')
      .set('authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Token invalid');
  });
});
