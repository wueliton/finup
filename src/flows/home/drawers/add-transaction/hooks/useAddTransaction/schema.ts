import yup from "config/yup.config";

const addTransactionSchema = yup.object({
  description: yup.string().required(),
  value: yup.number().required(),
  transactionAt: yup.date().required(),
});

export { addTransactionSchema };
