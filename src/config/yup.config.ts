import * as yup from "yup";
import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Campo é obrigatório",
    notType: "Tipo inválido",
    default: "Valor inválido",
  },
  string: {
    min: ({ min }) => `Mínimo de ${min} caracteres`,
    max: ({ max }) => `Máximo de ${max} caracteres`,
    email: "E-mail inválido",
    url: "URL inválida",
    matches: "Formato inválido",
  },
  number: {
    min: ({ min }) => `O valor deve ser maior ou igual a ${min}`,
    max: ({ max }) => `O valor deve ser menor ou igual a ${max}`,
    integer: "O valor deve ser um número inteiro",
    positive: "O valor deve ser positivo",
    negative: "O valor deve ser negativo",
  },
  date: {
    min: ({ min }) => `A data deve ser depois de ${min}`,
    max: ({ max }) => `A data deve ser antes de ${max}`,
  },
  array: {
    min: ({ min }) => `Deve ter pelo menos ${min} itens`,
    max: ({ max }) => `Deve ter no máximo ${max} itens`,
  },
});

export default yup;
