import { tv } from "tailwind-variants";

const dayButtonStyle = tv({
  base: "px-xs h-xl [&>div]:size-lg flex items-center justify-center [&>div]:flex [&>div]:cursor-pointer [&>div]:items-center [&>div]:justify-center [&>div]:rounded-full [&>div]:hover:bg-blue-100",
  variants: {
    isSameMonth: {
      false: "text-black/50",
    },
    isSelectedDay: {
      true: "text-white [&>div]:bg-blue-300 [&>div]:hover:bg-blue-400",
    },
    isToday: {
      true: "[&>div]:border-2 [&>div]:border-blue-300",
    },
  },
});

export { dayButtonStyle };
