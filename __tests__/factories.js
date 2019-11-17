import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';

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

export default factory;
