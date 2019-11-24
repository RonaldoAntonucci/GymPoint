import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import Mail from '../../lib/mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, registration, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula Realizada',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        start_date: format(
          parseISO(registration.start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registration.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: registration.price,
      },
    });
  }
}

export default new RegistrationMail();
