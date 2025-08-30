import Animated from "components/Animated";
import Button from "components/Button";
import { CalendarSelectionEnum } from "../../contants";
import InfiniteWheel from "./components/InfiniteWheel";
import useScrollWheel from "./hooks/useScrollWheel";
import type { ScrollWheelProps } from "./types";

function ScrollWheel({
  selectedDate,
  isOpen,
  onSelect,
  onCancel,
}: ScrollWheelProps) {
  const {
    dayList,
    monthList,
    yearList,
    selectedDay,
    selectedMonth,
    selectedYear,
    handleChange,
    handleSelect,
  } = useScrollWheel({
    initialDate: selectedDate,
    onSelect,
  });

  return (
    <>
      <Animated
        className="inset-none fixed z-20 bg-black/60"
        animation="fade"
        show={isOpen}
      />
      <Animated
        className="bottom-none left-none fixed z-20 w-full rounded-t-sm bg-white"
        animation="modal"
        show={isOpen}
      >
        <div className="flex justify-between">
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="ghost" type="button" onClick={handleSelect}>
            Selecionar
          </Button>
        </div>
        <div className="p-sm bg-gray-100">
          <div className="flex justify-center transform-3d">
            <div className="absolute top-1/2 left-1/2 h-[3.4rem] w-full -translate-1/2 divide-x rounded-sm bg-blue-300"></div>
            <InfiniteWheel
              itens={dayList}
              name="months"
              selected={selectedDay}
              onChange={handleChange(CalendarSelectionEnum.DAY)}
            />
            <InfiniteWheel
              itens={monthList}
              name="months"
              selected={selectedMonth}
              onChange={handleChange(CalendarSelectionEnum.MONTH)}
            />
            <InfiniteWheel
              itens={yearList}
              name="months"
              selected={selectedYear}
              onChange={handleChange(CalendarSelectionEnum.YEAR)}
            />
          </div>
        </div>
      </Animated>
    </>
  );
}

export default ScrollWheel;
