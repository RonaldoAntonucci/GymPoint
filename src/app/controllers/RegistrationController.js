import * as Yup from 'yup';
import { isBefore, parseISO, isValid } from 'date-fns';

import { Op } from 'sequelize';
import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/registrationMail';
import Queue from '../../lib/Queue';

import Registration from '../models/Registration';

class RegistrationController {
  // Mostra apenas as matrículas que ainda não terminaram
  async index(req, res) {
    const limitPage = process.env.PAGE_LIMIT;
    const { page = 1 } = req.query;

    const registrations = await Registration.findAll({
      limit: limitPage,
      offset: (page - 1) * limitPage,
      where: {
        end_date: {
          [Op.gte]: new Date(),
        },
      },
      order: ['end_date'],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number()
        .positive()
        .required(),
      student_id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id, student_id } = req.body;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(401).json({ error: 'This plan_id is invalid.' });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'This student_id is invalid.' });
    }

    const { start_date: checkStarDate } = req.body;
    if (!checkStarDate) {
      req.body.start_date = new Date();
    } else if (!isValid(parseISO(checkStarDate))) {
      return res.status(400).json({ error: 'This date is invalid.' });
    }

    if (isBefore(parseISO(checkStarDate), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const registration = await Registration.create(req.body);

    await Queue.add(RegistrationMail.key, {
      registration,
      student,
      plan,
    });

    const { start_date, end_date, price } = registration;

    return res.json({ student_id, plan_id, start_date, end_date, price });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      registrationId: Yup.number()
        .positive()
        .required(),
      student_id: Yup.number().positive(),
      plan_id: Yup.number().positive(),
      price: Yup.number().positive(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    const { registrationId } = req.params;
    req.body.registrationId = registrationId;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      return res.status(400).json({ error: 'Invalid registration id' });
    }

    const { plan_id: pId } = req.body;
    if (pId) {
      const plan = await Plan.findByPk(pId);
      if (!plan) {
        return res.status(400).json({ error: 'Invalid plan id' });
      }
    }

    const { student_id: stdId } = req.body;
    if (stdId) {
      const student = await Student.findByPk(stdId);
      if (!student) {
        return res.status(400).json({ error: 'Invalid student id' });
      }
    }

    /* const { end_date: checkEndDate } = req.body;
    if (!checkEndDate) {
      req.body.start_date = new Date();
    } else if (!isValid(parseISO(checkEndDate))) {
      return res.status(400).json({ error: 'This date is invalid.' });
    }

    if (isBefore(parseISO(checkEndDate), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    } */

    const { plan_id, student_id } = req.body;

    const { start_date, end_date, price } = await registration.update({
      plan_id,
      student_id,
    });

    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      registrationId: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { registrationId } = req.params;
    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      return res.status(400).json({ error: 'Invalid Registration id.' });
    }
    await registration.destroy();
    return res.json();
  }
}

export default new RegistrationController();
