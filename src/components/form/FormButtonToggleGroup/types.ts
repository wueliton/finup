import type { ButtonToggleGroupProps } from "components/fields/ButtonToggleGroup/types";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormButtonToggleGroupProps<
  isMultiple extends boolean,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ButtonToggleGroupProps<isMultiple>, "onChange" | "value"> {
  control?: Control<TFieldValues>;
  name: TName;
}

export type { FormButtonToggleGroupProps };
