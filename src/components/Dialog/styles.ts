import { tv } from "tailwind-variants";

const dialogStyles = tv({
  slots: {
    overlayContainer:
      "inset-none p-md fixed z-20 flex h-full w-full items-center justify-center bg-black/70",
    content:
      "p-md md:p-lg gap-md bottom-none fixed z-20 flex max-h-dvh w-full flex-col rounded-t-sm bg-white shadow-2xl lg:top-1/2 lg:left-1/2 lg:min-h-fit lg:max-w-5xl lg:-translate-1/2 lg:rounded-sm",
  },
});

export { dialogStyles };
