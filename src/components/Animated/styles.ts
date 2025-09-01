import { tv } from "tailwind-variants";

const animation = {
  zoom: {},
  pop: {},
  fade: {},
  modal: {},
};

const addAnimation = (
  name: keyof typeof animation,
  inClass: string,
  outClass: string,
) => [
  {
    animation: name,
    isMounted: false,
    className: inClass,
  },
  {
    animation: name,
    isMounted: true,
    className: outClass,
  },
];

const animatedStyles = tv({
  base: "",
  variants: {
    animation,
    isMounted: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    ...addAnimation(
      "zoom",
      "motion-safe:animate-zoom-out",
      "motion-safe:animate-zoom-in",
    ),
    ...addAnimation(
      "pop",
      "motion-safe:animate-pop-down",
      "motion-safe:animate-pop-up",
    ),
    ...addAnimation(
      "fade",
      "motion-safe:animate-fade-in",
      "motion-safe:animate-fade-out",
    ),
    ...addAnimation(
      "modal",
      "motion-safe:animate-slide-down lg:motion-safe:animate-pop-down",
      "motion-safe:animate-slide-up lg:motion-safe:animate-pop-up",
    ),
  ],
});

export { animatedStyles };
