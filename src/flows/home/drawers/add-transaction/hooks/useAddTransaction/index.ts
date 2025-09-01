import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addTransactionSchema } from "./schema";

function useAddTransaction() {
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(addTransactionSchema),
    defaultValues: {
      type: "expense",
    },
  });
  const transactionType = watch("type");
  const isExpense = transactionType === "expense";
  const categoryList = [
    { id: "123", name: "Categoria 1" },
    { id: "345", name: "Categoria 2" },
  ];
  const paymentTypeList = [
    {
      id: "123",
      name: "Nubank",
    },
  ];

  function onSubmit(data: unknown) {
    console.log({ data });
  }

  return {
    control,
    isExpense,
    categoryList,
    paymentTypeList,
    onSubmit: handleSubmit(onSubmit),
  };
}

export default useAddTransaction;
