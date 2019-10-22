import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async indexAdmin(req, res) {
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

  async indexUser(req, res) {
    const pageLimit = process.env.PAGE_LIMIT;
    const { page = 1 } = req.query;

    const { studentId: student_id } = req.params;
    const orders = await HelpOrder.findAll({
      where: {
        student_id,
      },
      order: [['updated_at', 'DESC']],
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { question } = req.body;
    const { studentId: student_id } = req.params;
    const order = await HelpOrder.create({ student_id, question });

    return res.json(order);
  }
}

export default new HelpOrderController();
