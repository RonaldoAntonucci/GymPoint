import Mail from '../../lib/mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { question, adminName = 'admin' } = data;

    await Mail.sendMail({
      to: `${question.student.name} <${question.student.email}>`,
      subject: `Resposta a solicitação nº ${question.id}`,
      template: 'answer',
      context: {
        student: question.student.name,
        admin: adminName,
        question: question.question,
        answer: question.answer,
      },
    });
  }
}

export default new HelpOrderMail();
