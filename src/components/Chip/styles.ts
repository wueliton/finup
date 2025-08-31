import { tv } from "tailwind-variants";

const chipStyles = tv({
  slots: {
    container: "flex items-center rounded-full text-sm",
  },
  variants: {
    variant: {
      green: {
        container: "bg-green-400/30 text-white",
      },
      red: {
        container: "bg-red-400/30 text-white",
      },
      white: {
        container: "bg-white/30 text-white",
      },
      gray: {
        container: "bg-gray-200",
      },
    },
    size: {
      normal: {
        container: "p-xs gap-xs",
      },
      sm: {
        container: "py-xxs px-xs gap-xxs",
      },
    },
  },
  defaultVariants: {
    size: "normal",
    variant: "gray",
  },
});

export { chipStyles };
