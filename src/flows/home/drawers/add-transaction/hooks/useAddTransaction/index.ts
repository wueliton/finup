import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addTransactionSchema } from "./schema";

function useAddTransaction() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(addTransactionSchema),
  });

  function onSubmit(data: unknown) {
    console.log({ data });
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
  };
}

export default useAddTransaction;
