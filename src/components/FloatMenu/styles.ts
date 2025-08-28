import { tv } from "tailwind-variants";

const floatMenuStyle = tv({
  slots: {
    container: "inset-none pointer-events-none fixed z-20",
    content:
      "p-sm mt-xxs pointer-events-auto absolute z-10 overflow-auto rounded-md bg-white opacity-0 shadow-xl",
  },
  variants: {
    zoomIn: {
      true: {
        content: "motion-safe:animate-pop-up",
      },
      false: {
        content: "motion-safe:animate-pop-down",
      },
    },
  },
});

export { floatMenuStyle };
