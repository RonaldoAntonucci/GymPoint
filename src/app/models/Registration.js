import Sequelize, { Model } from 'sequelize';
import { addMonths, addDays, differenceInDays } from 'date-fns';
import Plan from './Plan';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async registration => {
      const plan = await Plan.findByPk(registration.plan_id);
      registration.price = plan.price * plan.duration;
      registration.end_date = addMonths(registration.start_date, plan.duration);
    });

    this.addHook('beforeUpdate', async registration => {
      const plan = await Plan.findByPk(registration.plan_id);
      registration.price += plan.price * plan.duration;
      registration.end_date = addDays(
        registration.end_date,
        differenceInDays(registration.end_date, new Date())
      );
      registration.end_date = addMonths(registration.end_date, plan.duration);
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;
