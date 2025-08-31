import ButtonToggleGroup from "components/fields/ButtonToggleGroup";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import type { FormButtonToggleGroupProps } from "./types";

function FormButtonToggleGroup<
  isMultiple extends boolean,
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  ...toggleProps
}: FormButtonToggleGroupProps<isMultiple, TFieldValues>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const internalForm = useForm<any>({ defaultValues: { [name]: "" } });
  const internalControl = control ?? internalForm.control;

  return (
    <Controller
      control={internalControl}
      name={name}
      render={({ field }) => {
        return <ButtonToggleGroup {...toggleProps} {...field} />;
      }}
    />
  );
}

export default FormButtonToggleGroup;
