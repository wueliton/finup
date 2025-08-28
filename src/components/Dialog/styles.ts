import { tv } from "tailwind-variants";

const dialogStyles = tv({
  slots: {
    overlayContainer:
      "inset-none p-md fixed flex h-full w-full items-center justify-center bg-black/20 backdrop-blur-xs",
    content:
      "p-lg gap-md fixed top-1/2 left-1/2 flex w-full max-w-5xl -translate-1/2 flex-col rounded-sm bg-white shadow-2xl",
  },
});

export { dialogStyles };
