import { tv } from "tailwind-variants";

const autocompleteOptionsStyle = tv({
  base: "p-sm gap-sm flex items-center rounded-sm",
  variants: {
    isActive: {
      true: "cursor-default bg-blue-100",
      false: "cursor-pointer hover:bg-gray-100",
    },
    isSelected: {
      true: "",
    },
    isFocused: {
      true: "bg-gray-100",
    },
  },
});

export { autocompleteOptionsStyle };
