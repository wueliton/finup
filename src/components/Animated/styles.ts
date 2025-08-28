import { tv } from "tailwind-variants";

const animatedStyles = tv({
  base: "",
  variants: {
    animation: {
      zoom: {},
      pop: {},
      fade: {},
      modal: {},
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
    {
      animation: "modal",
      isMounted: false,
      className:
        "motion-safe:animate-slide-down lg:motion-safe:animate-pop-down",
    },
    {
      animation: "modal",
      isMounted: true,
      className: "motion-safe:animate-slide-up lg:motion-safe:animate-pop-up",
    },
  ],
});

export { animatedStyles };
