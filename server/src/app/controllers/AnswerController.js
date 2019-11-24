import * as Yup from 'yup';
import HelpOrderMail from '../jobs/helpOrderMail';
import Queue from '../../lib/Queue';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import User from '../models/User';

class AnswerController {
  async index(req, res) {
    const pageLimit = process.env.PAGE_LIMIT;
    const { page = 1 } = req.query;

    const orders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      order: [['updated_at', 'DESC']],
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const oderId = req.params.orderId;
    const question = await HelpOrder.findByPk(oderId, {
      include: [
        { model: Student, attributes: ['email', 'name'], as: 'student' },
      ],
    });

    if (!question) {
      return res.status(400).json({ error: 'This order id is invalid.' });
    }
    if (question.answer_at) {
      return res
        .status(400)
        .json({ error: 'This question has already been answered.' });
    }

    const { answer } = req.body;
    await question.update({ answer, answer_at: new Date() });

    const { name: adminName } = await User.findByPk(req.userId, {
      attributes: ['name'],
    });

    await Queue.add(HelpOrderMail.key, {
      question,
      adminName,
    });

    return res.json(question);
  }
}

export default new AnswerController();
