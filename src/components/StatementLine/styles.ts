import { tv } from "tailwind-variants";

const statementLineStyle = tv({
  slots: {
    container:
      "gap-sm p-sm flex flex-col items-start rounded-xs bg-gray-100/50 transition hover:bg-gray-200/50 md:flex-row md:items-center",
    iconContainer: "p-xs relative rounded-xs bg-white text-black shadow-2xl",
    typeContainer:
      "right-none p-xxs bottom-none absolute translate-1/3 rounded-full border border-gray-100",
    contentContainer: "gap-xs flex flex-1 flex-col",
    subtitleContainer: "text-xs text-black/60",
    amountContainer: "font-semibold",
  },
  variants: {
    type: {
      income: {
        typeContainer: "bg-green-400",
        amountContainer: "text-green-800",
      },
      expense: {
        typeContainer: "bg-red-400",
        amountContainer: "text-red-700",
      },
    },
  },
});

export { statementLineStyle };
