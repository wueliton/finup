import type { AutocompleteProps } from "components/fields/Autocomplete/types";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormAutomcompleteProps<
  Data extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends AutocompleteProps<Data> {
  control?: Control<TFieldValues>;
  name: TName;
}

export type { FormAutomcompleteProps };
