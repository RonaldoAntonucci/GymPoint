// const { Router } = require("express");
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';
import checkStudentExist from './app/middlewares/checkStudentExist';
import checkUserAdmin from './app/middlewares/checkUserAdmin';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/students', checkUserAdmin, StudentController.index);
routes.get('/students/:studentId', checkUserAdmin, StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:studentId', checkStudentExist, StudentController.update);

// checkins
routes.get(
  '/students/:studentId/checkins',
  checkStudentExist,
  CheckinController.index
);
routes.post(
  '/students/:studentId/checkins',
  checkStudentExist,
  CheckinController.store
);

// help orders
routes.get('/help-orders', checkUserAdmin, HelpOrderController.indexAdmin);
routes.get(
  '/students/:studentId/help-orders',
  checkStudentExist,
  HelpOrderController.indexUser
);

routes.post(
  '/students/:studentId/help-orders',
  checkStudentExist,
  HelpOrderController.store
);

// answer orders
routes.post(
  '/help-orders/:orderId/answer',
  checkUserAdmin,
  AnswerController.store
);

routes.get('/plans', checkUserAdmin, PlanController.index);
routes.get('/plans/:planId', checkUserAdmin, PlanController.show);
routes.post('/plans', checkUserAdmin, PlanController.store);
routes.put('/plans/:planId', checkUserAdmin, PlanController.update);
routes.delete('/plans/:planId', checkUserAdmin, PlanController.delete);

routes.get('/registrations', checkUserAdmin, RegistrationController.index);
routes.post('/registrations', checkUserAdmin, RegistrationController.store);
routes.put(
  '/registrations/:registrationId',
  checkUserAdmin,
  RegistrationController.update
);
routes.delete(
  '/registrations/:registrationId',
  checkUserAdmin,
  RegistrationController.delete
);

export default routes;
