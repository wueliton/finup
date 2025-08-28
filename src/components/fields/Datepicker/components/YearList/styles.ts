import { tv } from "tailwind-variants";

const yearButtonStyle = tv({
  base: "p-sm my-sm cursor-pointer rounded-full transition first-letter:capitalize hover:bg-blue-100",
  variants: {
    isActive: {
      true: "bg-blue-300 text-white hover:bg-blue-300",
    },
  },
});

export { yearButtonStyle };
