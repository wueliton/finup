import Datepicker from "components/fields/Datepicker";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import type { FormDatepickerProps } from "./types";

function FormDatepicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  ...props
}: FormDatepickerProps<TFieldValues>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const internalForm = useForm<any>({ defaultValues: { [name]: "" } });
  const internalControl = control ?? internalForm.control;

  return (
    <Controller
      control={internalControl}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Datepicker
            {...props}
            label={label}
            error={error?.message}
            {...field}
          />
        );
      }}
    />
  );
}

export default FormDatepicker;
