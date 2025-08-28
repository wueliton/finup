import { tv } from "tailwind-variants";

const animatedStyles = tv({
  base: "",
  variants: {
    animation: {
      zoom: {},
      pop: {},
      fade: {},
    },
    isMounted: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      animation: "zoom",
      isMounted: false,
      className: "motion-safe:animate-zoom-out",
    },
    {
      animation: "zoom",
      isMounted: true,
      className: "motion-safe:animate-zoom-in",
    },
    {
      animation: "pop",
      isMounted: false,
      className: "motion-safe:animate-pop-down",
    },
    {
      animation: "pop",
      isMounted: true,
      className: "motion-safe:animate-pop-up",
    },
    {
      animation: "fade",
      isMounted: false,
      className: "motion-safe:animate-fade-in",
    },
    {
      animation: "fade",
      isMounted: true,
      className: "motion-safe:animate-fade-out",
    },
  ],
});

export { animatedStyles };
