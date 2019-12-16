import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string().required('O Título é obrigatório'),
  duration: Yup.number('Duração inválida')
    .required('A duraçãp é obrigatória')
    .integer('A duração deve ser um número inteiro')
    .positive('Duração inválida'),
  price: Yup.number()
    .required('O preço é obrigatóri')
    .positive('Preço inválido'),
});
