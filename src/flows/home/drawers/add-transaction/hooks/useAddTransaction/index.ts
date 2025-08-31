import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addTransactionSchema } from "./schema";

function useAddTransaction() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(addTransactionSchema),
  });
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
    categoryList,
    paymentTypeList,
    onSubmit: handleSubmit(onSubmit),
  };
}

export default useAddTransaction;
