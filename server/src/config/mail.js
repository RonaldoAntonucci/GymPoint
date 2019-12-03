export default {
  host: process.env.MAIL_HOST,
  post: process.env.MAIL_POST,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GymPoint <noreply@GymPoint.com>',
  },
};