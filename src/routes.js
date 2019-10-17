// const { Router } = require("express");
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';
import checkStudentExist from './app/middlewares/checkStudentExist';
import checkUserAdmin from './app/middlewares/checkUserAdmin';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students/:studentId', checkStudentExist, StudentController.update);

routes.get('/plans', checkUserAdmin, PlanController.index);
routes.post('/plans', checkUserAdmin, PlanController.store);
routes.put('/plans/:planId', checkUserAdmin, PlanController.update);
routes.delete('/plans/:planId', checkUserAdmin, PlanController.delete);

export default routes;
