import User from '../models/User';

export default async (req, res, next) => {
  const { userId } = req;
  const { acess_id } = await User.findByPk(userId);
  if (acess_id < process.env.ADMIN_ACESS_ID || !acess_id) {
    return res.status(403).json({ error: 'Acess danied.' });
  }
  return next();
};
