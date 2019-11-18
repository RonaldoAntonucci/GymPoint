import request from 'supertest';
import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

let token = null;

describe('Plan controller /store', () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeEach(() => {
    token = factory.getValidToken();
  });

  it('should be able to register new plan', async () => {
    const plan = await factory.attrs('Plan');

    const res = await request(app)
      .post('/plans')
      .set('authorization', `Bearer ${token}`)
      .send(plan);
  });
});
