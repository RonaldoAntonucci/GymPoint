import Student from '../models/Student';

export default async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findByPk(studentId);
  if (!student) {
    return res.status(400).json({ error: 'This student does not exist' });
  }

  req.studentId = studentId;
  return next();
};
