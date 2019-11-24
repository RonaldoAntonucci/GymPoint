import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const pageLimit = process.env.PAGE_LIMIT;
    const { page = 1 } = req.query;
    const { studentId: student_id } = req.params;

    const checkins = await Checkin.findAll({
      where: { student_id },
      order: [['updated_at', 'DESC']],
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
    });
    res.json(checkins);
  }

  async store(req, res) {
    const { studentId: student_id } = req.params;
    const checkIns = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date()), new Date()],
        },
      },
    });
    if (checkIns.count >= process.env.CHECKINS) {
      return res
        .status(401)
        .json(
          `You already have ${process.env.CHECKINS} check-ins within 7 days.`
        );
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
