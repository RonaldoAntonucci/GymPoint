import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factories';
import truncate from '../../util/truncate';

let token = null;

describe('Student /store', () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeEach(async () => {
    const { email, password } = await factory.create('User');
    const res = await request(app)
      .post('/sessions')
      .send({ email, password });
    token = res.body.token;
  });

  it('should be able to register new student', async () => {
    const student = await factory.attrs('Student');

    const res = await request(app)
      .post('/students')
      .set('authorization', `Bearer ${token}`)
      .send(student);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('age');
    expect(res.body).toHaveProperty('weight');
    expect(res.body).toHaveProperty('height');
  });

  it('should be not able to register new student with exist email', async () => {
    const [studentExist, student] = await Promise.all([
      factory.create('Student'),
      factory.attrs('Student'),
    ]);
    student.email = studentExist.email;

    const res = await request(app)
      .post('/students')
      .set('authorization', `Bearer ${token}`)
      .send(student);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Student email already in use.');
  });

  it('should be not able to register new student without valid data', async () => {
    const res = await request(app)
      .post('/students')
      .set('authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation fails');
  });
});
