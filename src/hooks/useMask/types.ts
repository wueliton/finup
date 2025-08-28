import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type Masks from "./masks";

type ObtainMethods<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type MaskOptions = ObtainMethods<typeof Masks>;

type InputModeOptions = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>["inputMode"];

export type { InputModeOptions, MaskOptions };
