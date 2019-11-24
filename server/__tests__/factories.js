import faker from 'faker';
import { factory } from 'factory-girl';

import jwt from 'jsonwebtoken';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';
import Plan from '../src/app/models/Plan';

import authConfig from '../src/config/auth';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number({ min: 18, max: 100 }),
  weight: faker.random.number({ min: 20, max: 300, precision: 0.01 }),
  height: faker.random.number({ min: 1, max: 3, precision: 0.01 }),
});

factory.define('Plan', Plan, {
  title: faker.internet.userName(),
  duration: faker.random.number({ min: 1, max: 120 }),
  price: faker.random.number({ min: 0, max: 10000, precision: 0.01 }),
});

factory.getValidToken = id => {
  if (!id) {
    id = faker.random.number();
  }
  return jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
};

export default factory;
