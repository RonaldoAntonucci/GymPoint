import User from '../models/User';

export default async (req, res, next) => {
  const { userId } = req;
  if (!userId) {
    return res.status(403).json({ error: 'Acess danied.' });
  }
  const user = await User.findByPk(userId, {
    attributes: ['acess_id'],
  });
  if (!user) {
    return res.status(403).json({ error: 'Acess danied.' });
  }
  const { acess_id } = user;

  if (!acess_id || acess_id < process.env.ADMIN_ACESS_ID) {
    return res.status(403).json({ error: 'Acess danied.' });
  }
  return next();
};
