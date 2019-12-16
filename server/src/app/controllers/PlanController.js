import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const limitPage = process.env.PAGE_LIMIT;
    const { page = 1, quantity = 20 } = req.query;
    const qant = Number(quantity) > limitPage ? limitPage : quantity;

    const { rows: plans, count } = await Plan.findAndCountAll({
      limit: qant,
      offset: (page - 1) * qant,
      attributes: ['id', 'title', 'duration', 'price'],
      order: [['updated_at', 'DESC']],
    });

    return res.set({ total_pages: Math.ceil(count / qant) }).json(plans);
  }

  async show(req, res) {
    const { planId } = req.params;

    const plan = await Plan.findByPk(planId, {
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plan);
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
