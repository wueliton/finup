import { tv } from "tailwind-variants";

const inputStyles = tv({
  slots: {
    container:
      "px-xs gap-xs min-h-xl flex cursor-text items-center rounded-xs border border-black/15 text-black/50",
    content:
      "pt-sm pb-xxs gap-xs relative flex w-full items-center justify-start",
    input:
      "peer w-full text-black placeholder-transparent ring-0 focus-within:placeholder-gray-400",
    labelContainer:
      "left-none peer-focus:translate-y-none peer-data-[textprefix=true]:translate-y-none absolute top-[0.2rem] origin-left scale-70 cursor-text text-gray-700 transition peer-placeholder-shown:translate-y-3/4 peer-placeholder-shown:scale-100 peer-focus:scale-70 peer-data-[textprefix=true]:scale-70",
  },
  variants: {
    hidden: {
      true: {
        input: "size-none absolute",
      },
    },
    error: {
      false: {
        container:
          "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200",
      },
      true: {
        container:
          "border-red-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export { inputStyles };
