import type { InputProps } from "components/fields/Input/types";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends InputProps<TFieldValues> {
  control?: Control<TFieldValues>;
  name: TName;
}

export type { FormInputProps };
