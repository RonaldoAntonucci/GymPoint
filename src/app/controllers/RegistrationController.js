import * as Yup from 'yup';
import { isBefore, parseISO, isValid } from 'date-fns';

import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/registrationMail';
import Queue from '../../lib/Queue';

import Registration from '../models/Registration';

class RegistrationController {
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

    return res.json({ start_date, end_date, price });
  }
}

export default new RegistrationController();
