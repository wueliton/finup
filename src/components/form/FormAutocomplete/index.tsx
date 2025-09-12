import Autocomplete from "components/fields/Autocomplete";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import type { FormAutomcompleteProps } from "./types";

function FormAutomcomplete<
  Data extends object,
  TFieldValues extends FieldValues,
>({
  control,
  name,
  ...autocompleteProps
}: FormAutomcompleteProps<Data, TFieldValues>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const internalForm = useForm<any>({ defaultValues: { [name]: "" } });
  const internalControl = control ?? internalForm.control;

  return (
    <Controller
      control={internalControl}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const errorMap = (error ?? {}) as Data;
        const errorMessage =
          error?.message ?? Object.values(errorMap)?.at(0)?.message;

        return (
          <Autocomplete
            {...autocompleteProps}
            {...field}
            error={errorMessage}
          />
        );
      }}
    />
  );
}

export default FormAutomcomplete;
