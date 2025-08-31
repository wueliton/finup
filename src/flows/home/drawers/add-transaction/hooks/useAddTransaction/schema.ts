import yup from "config/yup.config";

const addTransactionSchema = yup.object({
  description: yup.string().required(),
  value: yup.number().required(),
  transactionAt: yup.date().required(),
  category: yup.object({
    id: yup.string(),
    name: yup.string(),
  }),
  paymentType: yup.object({
    id: yup.string(),
    name: yup.string(),
  }),
});

export { addTransactionSchema };
