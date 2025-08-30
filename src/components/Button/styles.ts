import { tv } from "tailwind-variants";

const buttonStyles = tv({
  slots: {
    container:
      "p-sm gap-xxs flex items-center justify-center rounded-sm transition not-disabled:cursor-pointer",
  },
  variants: {
    variant: {
      primary: {
        container:
          "bg-blue-600 text-white shadow hover:not-disabled:bg-blue-700 active:not-disabled:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-400",
      },
      secondary: {
        container:
          "border border-gray-300 shadow hover:not-disabled:bg-gray-100 active:not-disabled:bg-gray-200",
      },
      ghost: {
        container:
          "hover:not-disabled:bg-gray-100 active:not-disabled:bg-gray-200",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export { buttonStyles };
