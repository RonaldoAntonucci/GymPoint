import request from 'supertest';
import { addDays, addMonths } from 'date-fns';
import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import Queue from '../../../src/lib/Queue';

let token = null;

jest.mock('../../../src/lib/Queue');
Queue.add = jest.fn();

describe('Registration /Store', () => {
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

  it('should be able to register new registration', async () => {
    const [student, plan] = await Promise.all([
      factory.create('Student'),
      factory.create('Plan'),
    ]);

    const res = await request(app)
      .post('/registrations')
      .set('authorization', `Bearer ${token}`)
      .send({ plan_id: plan.id, student_id: student.id });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('student_id');
    expect(res.body).toHaveProperty('plan_id');
    expect(res.body).toHaveProperty('start_date');
    expect(res.body).toHaveProperty('end_date');
    expect(res.body).toHaveProperty('price');
    expect(Queue.add).toBeCalled();
  });

  it('should be able to register new registration with future date', async () => {
    const [student, plan] = await Promise.all([
      factory.create('Student'),
      factory.create('Plan'),
    ]);
    const start_date = addDays(new Date(), 10);
    const end_date = addMonths(start_date, plan.duration);

    const res = await request(app)
      .post('/registrations')
      .set('authorization', `Bearer ${token}`)
      .send({ plan_id: plan.id, student_id: student.id, start_date });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('student_id');
    expect(res.body).toHaveProperty('plan_id');
    expect(res.body).toHaveProperty('price');
    expect(Queue.add).toBeCalled();
    expect(res.body.start_date).toBe(String(start_date));
    expect(res.body.end_date).toBe(String(end_date));
  });
});
