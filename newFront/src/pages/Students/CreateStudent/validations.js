import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer('Idade deve ser um número inteiro')
    .required('A idade é obrigatória')
    .positive('Idade inválida'),
  weight: Yup.number('O peso deve ser um número')
    .positive('Peso inválido')
    .required('O peso é obrigatório'),
  height: Yup.number('A altura deve ser um número')
    .required('A altura é obrigatória')
    .positive('Altura inválida'),
});
