import Datepicker from "components/fields/Datepicker";
import { Controller, useForm } from "react-hook-form";
import type { FormDatepickerProps } from "./types";

function FormDatepicker({ control, name, label }: FormDatepickerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const internalForm = useForm<any>({ defaultValues: { [name]: "" } });
  const internalControl = control ?? internalForm.control;

  return (
    <Controller
      control={internalControl}
      name={name}
      render={({ field }) => {
        return <Datepicker label={label} {...field} />;
      }}
    />
  );
}

export default FormDatepicker;
