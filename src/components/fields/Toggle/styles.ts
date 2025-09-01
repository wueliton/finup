import { tv } from "tailwind-variants";

const toggleStyle = tv({
  slots: {
    labelContent: "gap-xs inline-flex cursor-pointer items-center select-none",
    input: "peer sr-only",
    toggle:
      "peer h-md relative w-[4.4rem] rounded-full bg-gray-200 inset-shadow-2xs peer-checked:bg-blue-600 peer-focus-visible:ring-3 peer-focus-visible:ring-blue-300 after:absolute after:start-[2px] after:top-[0.2rem] after:h-[2.0rem] after:w-[2.0rem] after:rounded-full after:border after:border-gray-300 after:bg-white after:shadow-2xs after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full",
    toggleLabel: "text-black/70",
  },
});

export { toggleStyle };
