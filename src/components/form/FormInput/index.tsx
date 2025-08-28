import { Input } from "components/fields";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import type { FormInputProps } from "./types";

function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  ...inputProps
}: FormInputProps<TFieldValues>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const internalForm = useForm<any>({ defaultValues: { [name]: "" } });
  const internalControl = control ?? internalForm.control;

  return (
    <Controller
      control={internalControl}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return <Input {...inputProps} {...field} error={error?.message} />;
      }}
    />
  );
}

export default FormInput;
