import { tv } from "tailwind-variants";

const buttonIconStyles = tv({
  slots: {
    container: "p-xxs cursor-pointer rounded-xs transition",
  },
  variants: {
    variant: {
      primary: {
        container:
          "border border-gray-200 bg-white shadow hover:bg-gray-100 active:bg-gray-200",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export { buttonIconStyles };
