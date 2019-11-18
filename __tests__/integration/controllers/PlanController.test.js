import request from 'supertest';
import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

import Plan from '../../../src/app/models/Plan';

let token = null;

describe('Plan /index', () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeEach(async () => {
    const { password, email } = await factory.create('User', { acess_id: 2 });
    const res = await request(app)
      .post('/sessions')
      .send({ email, password });

    token = res.body.token;
  });

  it('should be able to find plans', async () => {
    const plans = await factory.attrsMany('Plan', 50);
    let count = 0;

    const newPlans = plans.map(plan => {
      count += 1;
      plan.title += `${count}`;
      return plan;
    });

    await Plan.bulkCreate(newPlans);

    const res = await request(app)
      .get('/plans')
      .set('authorization', `Bearer ${token}`)
      .send();

    expect(res.status).toBe(200);
    expect(`${res.body.length}`).toBe(process.env.PAGE_LIMIT);
  });
});

describe('Plan controller /store', () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeEach(async () => {
    const { password, email } = await factory.create('User', { acess_id: 2 });
    const res = await request(app)
      .post('/sessions')
      .send({ email, password });

    token = res.body.token;
  });

  it('should be able to register new plan', async () => {
    const plan = await factory.attrs('Plan');

    const res = await request(app)
      .post('/plans')
      .set('authorization', `Bearer ${token}`)
      .send(plan);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('duration');
    expect(res.body).toHaveProperty('price');
  });

  it('should not be able to register new plan with invalid data', async () => {
    const res = await request(app)
      .post('/plans')
      .set('authorization', `Bearer ${token}`)
      .send({ title: 123456, duration: -10, price: 'invalid' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation fails');
  });

  it('should not be able to register new plan with invalid title', async () => {
    const plan = await factory.create('Plan');
    const res = await request(app)
      .post('/plans')
      .set('authorization', `Bearer ${token}`)
      .send({ title: plan.title, duration: 10, price: 100.0 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('This plan title already in use.');
  });
});

let globalPlan = null;

describe('Plan /update', () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeEach(async () => {
    const { password, email } = await factory.create('User', { acess_id: 2 });
    const res = await request(app)
      .post('/sessions')
      .send({ email, password });

    token = res.body.token;
  });

  beforeEach(async () => {
    globalPlan = await factory.create('Plan');
  });

  it('Should be able to update plans', async () => {
    const { id } = globalPlan;
    const res = await request(app)
      .put(`/plans/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'newTitle',
        duration: 12,
        price: 1000,
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('newTitle');
    expect(res.body.duration).toBe(12);
    expect(res.body.price).toBe(1000);
  });

  it('Should not be able to update plans with invalid dates', async () => {
    const { id } = globalPlan;
    const res = await request(app)
      .put(`/plans/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({ title: 123456, duration: -10, price: 'invalid' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation fails');
  });

  it('Should not be able to update plans with invalid id', async () => {
    const id = 10;
    const res = await request(app)
      .put(`/plans/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'newTitle',
        duration: 12,
        price: 1000,
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation plan id fails');
  });

  it('Should not be able to update plans with used title', async () => {
    const { id } = globalPlan;
    const { title } = await factory.create('Plan', { title: 'usedTitle' });
    const res = await request(app)
      .put(`/plans/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        title,
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Title already in use.');
  });
});

describe('Plan /delete', () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeEach(async () => {
    const { password, email } = await factory.create('User', { acess_id: 2 });
    const res = await request(app)
      .post('/sessions')
      .send({ email, password });

    token = res.body.token;
  });

  it('should be able to delete plan', async () => {
    const { id } = await factory.create('Plan');

    const res = await request(app)
      .delete(`/plans/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send();

    expect(res.status).toBe(200);

    const plan = await Plan.findByPk(id);

    expect(plan).toBeNull();
  });

  it('should not be able to delete plan with invalid id', async () => {
    const id = -10;
    const res = await request(app)
      .delete(`/plans/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send();

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation fails');
  });

  it('should not be able to delete nonexistent plan', async () => {
    const id = 1;
    const res = await request(app)
      .delete(`/plans/${id}`)
      .set('authorization', `Bearer ${token}`)
      .send();

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid Plan id.');
  });
});
