import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const limitPage = process.env.PAGE_LIMIT;

    const [total, plans] = await Promise.all([
      Plan.count(),
      await Plan.findAll({
        order: [['updated_at', 'DESC']],
        limit: limitPage,
        offset: (page - 1) * limitPage,
        attributes: ['id', 'title', 'duration', 'price'],
      }),
    ]);

    const lastPage = Math.trunc(total / limitPage + 1);

    return res.json({ plans, lastPage });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title: checkTitle } = req.body;
    const checkPlanExist = await Plan.findOne({ where: { title: checkTitle } });
    if (checkPlanExist) {
      return res.status(400).json({ error: 'This plan title already in use.' });
    }

    const { id, title, duration, price } = await Plan.create({
      title: req.body.title,
      duration: req.body.duration,
      price: req.body.price,
    });

    return res.json({ id, title, duration, price });
  }

  async update(req, res) {
    req.body.planId = req.params.planId;
    const schema = Yup.object().shape({
      planId: Yup.number()
        .positive()
        .required(),
      title: Yup.string(),
      duration: Yup.number().positive(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.params.planId);
    if (!plan) {
      return res.status(400).json({ error: 'Validation plan id fails' });
    }

    const { title: checkTitle } = req.body;
    if (checkTitle !== plan.title) {
      const checkTitleUsed = await Plan.findOne({
        where: { title: checkTitle },
      });
      if (checkTitleUsed) {
        return res.status(400).json({ error: 'Title already in use.' });
      }
    }

    const { id, title, duration, price } = await plan.update({
      title: req.body.title,
      duration: req.body.duration,
      price: req.body.price,
    });

    return res.json({ id, title, duration, price });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      planId: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { planId } = req.params;
    const plan = await Plan.findByPk(planId);
    if (!plan) {
      return res.status(400).json({ error: 'Invalid Plan id.' });
    }
    await plan.destroy();
    return res.json();
  }
}

export default new PlanController();
