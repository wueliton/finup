import type { DatepickerPops } from "components/fields/Datepicker/types";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormDatepickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends DatepickerPops {
  control?: Control<TFieldValues>;
  name: TName;
}

export type { FormDatepickerProps };
