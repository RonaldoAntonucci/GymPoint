import request from 'supertest';
import factory from '../../factories';
import truncate from '../../util/truncate';

import app from '../../../src/app';
import studentExist from '../../../src/app/middlewares/checkStudentExist';

app.post('/testStudentExist', studentExist, (req, res) => {
  res.json({ studentId: req.studentId });
});

describe('middleware checkStudentExist', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('should be call middleware with valid student and return studentId', async () => {
    const { id } = await factory.create('Student');

    const res = await request(app)
      .post(`./testStudentExist/${id}`)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.studentId).toBe(id);
  });

  it('should be call middleware checkStudentExist with invalid student and return an error', async () => {
    const id = -1;
    const res = await request(app)
      .post(`./testStudentExist/${id}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('This student does not exist');
  });

  it('should be call middleware checkStudentExist without student', async () => {
    const res = await request(app)
      .post(`./testStudentExist/`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('This student does not exist');
  });
});
