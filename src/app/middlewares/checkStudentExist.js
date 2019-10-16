import * as Yup from 'yup';
import Student from '../models/Student';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number()
      .required()
      .positive(),
  });

  if (!(await schema.isValid(req.params))) {
    return res.status(400).json({ error: 'Id validation fails' });
  }

  const { id } = req.params;
  const student = await Student.findByPk(id);
  if (!student) {
    return res.status(400).json({ error: 'This student does not exist' });
  }

  req.studentId = id;
  return next();
};
