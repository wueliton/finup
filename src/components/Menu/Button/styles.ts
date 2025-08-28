import { tv } from "tailwind-variants";

const menuButtonStyles = tv({
  slots: {
    container: "p-xs rounded-full",
    iconContainer: "",
  },
  variants: {
    isActive: {
      true: {
        container: "bg-blue-100",
        iconContainer: "text-blue-600",
      },
      false: {
        container: "bg-white hover:bg-gray-200",
      },
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export { menuButtonStyles };
