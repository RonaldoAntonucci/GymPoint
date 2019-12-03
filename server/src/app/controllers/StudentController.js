import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const limitPage = process.env.PAGE_LIMIT;
    const { page = 1 } = req.query;

    const { q } = req.query;

    const where = q
      ? {
          name: {
            [Op.substring]: q,
          },
        }
      : null;

    const student = await Student.findAll({
      limit: limitPage,
      offset: (page - 1) * limitPage,
      order: ['id'],
      where,
      attributes: ['id', 'name', 'email', 'age'],
    });

    return res.json(student);
  }

  async show(req, res) {
    const { studentId } = req.params;

    const student = await Student.findByPk(studentId, {
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkEmail = await Student.findOne({
      where: { email: req.body.email },
    });

    if (checkEmail) {
      return res.status(400).json({ error: 'Student email already in use.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({ id, name, email, age, weight, height });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .positive()
        .integer(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const student = await Student.findByPk(req.studentId);

    const { email: newEmail } = req.body;

    if (newEmail && newEmail !== student.email) {
      const checkstudent = await Student.findOne({
        where: { email: newEmail },
      });
      if (checkstudent) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    }

    const { id, name, email, age, weight, height } = await student.update({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
    });

    return res.json({ id, name, email, age, weight, height });
  }
}

export default new StudentController();