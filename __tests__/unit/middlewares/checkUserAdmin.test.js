import request from 'supertest';
import express from 'express';
import factory from '../../factories';
import truncate from '../../util/truncate';

import checkUserAdmin from '../../../src/app/middlewares/checkUserAdmin';

const app = express();
app.post(
  '/testCheckUserAdmin',
  (req, res, next) => {
    req.userId = req.headers.id;
    next();
  },
  checkUserAdmin,
  (req, res) => {
    res.json({ userId: req.userId });
  }
);

describe('middleware checkUserAdmin', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be call next() for user Admins', async () => {
    const { id } = await factory.create('User', { acess_id: 2 });

    const res = await request(app)
      .post('/testCheckUserAdmin')
      .set('id', id)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(`${id}`);
  });

  it('should be return an error to call with not admin user', async () => {
    const { id } = await factory.create('User');

    const res = await request(app)
      .post('/testCheckUserAdmin')
      .set('id', id)
      .send({});

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Acess danied.');
  });

  it('should be return an error to call without userId', async () => {
    const res = await request(app)
      .post('/testCheckUserAdmin')
      .send({});

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Acess danied.');
  });
});
