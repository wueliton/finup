import { tv } from "tailwind-variants";

const slideContentStyles = tv({
  slots: {
    container: "overflow-hidden",
  },
  variants: {
    isDragging: {
      true: {},
    },
  },
});

export { slideContentStyles };
