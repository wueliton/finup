import useInfiniteWheel from "./hooks/useInfiniteWheel";
import type { InfiniteWheelProps } from "./types";

function InfiniteWheel({
  itens,
  name,
  selected,
  onChange,
}: InfiniteWheelProps) {
  const {
    listItens,
    listStyle,
    handleMouseDown,
    handleTouchStart,
    handleOnClick,
  } = useInfiniteWheel({
    itens,
    name,
    selected,
    onChange,
  });

  return (
    <div
      className="relative"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="relative top-1/2 h-[16.8rem] -translate-y-1/2 overflow-hidden select-none">
        <div
          className="[&_div]:leading[3.4rem] [&_div]:px-sm relative -top-px [&_div]:h-[3.4rem]"
          style={listStyle}
        >
          {listItens.map((item) => (
            <div
              className="flex items-center rounded-sm text-left ring-0 transition-colors outline-none focus-within:bg-gray-400/40 hover:bg-gray-400/40"
              key={item.key}
              onClick={handleOnClick(item.scrollTo)}
              tabIndex={item.tabIndex}
            >
              <span className="first-letter:capitalize">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfiniteWheel;
