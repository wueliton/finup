import Animated from "components/Animated";
import ButtonIcon from "components/ButtonIcon";
import FloatMenu from "components/FloatMenu";
import SlideContent from "components/SlideContent";
import { addMonths, addYears } from "date-fns";
import { CalendarSelectionEnum } from "../../contants";
import DayList from "./components/DayList";
import MonthList from "./components/MonthList";
import YearList from "./components/YearList";
import useDesktopSelector from "./hooks/useDesktopSelector";
import type { DesktopSelectorProps } from "./types";

function DesktopSelector({
  selectedDate,
  isOpen,
  containerRef,
  onSelect,
}: DesktopSelectorProps) {
  const {
    calendar,
    pageLabel,
    showSelectMonthOrYear,
    showYearSelection,
    focusTrapRef,
    handleSelectionType,
    handlePrevious,
    handleNext,
    handlePageChange,
    handleAddRef,
    handleSelect,
    handleFocusChange,
  } = useDesktopSelector({
    selectedDate,
    isOpen,
    onSelect,
  });

  return (
    <FloatMenu
      isOpen={isOpen}
      containerRef={containerRef}
      ref={focusTrapRef}
      className="gap-md flex min-w-2xl flex-col"
    >
      <div className="flex items-center justify-between">
        <div aria-live="polite">
          <button
            onClick={handleSelectionType}
            className="cursor-pointer first-letter:capitalize"
          >
            {pageLabel}
          </button>
        </div>
        <div className="gap-xs flex items-center">
          <ButtonIcon icon="AltArrowLeft" onClick={handlePrevious} />
          <ButtonIcon icon="AltArrowRight" onClick={handleNext} />
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <SlideContent
          onPageChange={handlePageChange(CalendarSelectionEnum.DAY)}
          ref={handleAddRef(CalendarSelectionEnum.DAY)}
          render={(page) => (
            <DayList
              selectedDay={selectedDate}
              disableTabIndex={showSelectMonthOrYear}
              listMonth={addMonths(calendar.date, page)}
              onSelect={handleSelect(CalendarSelectionEnum.DAY)}
              nextTabIndexDate={calendar.date}
              onFocusChange={handleFocusChange}
            />
          )}
        />
        <div>
          <Animated
            animation="zoom"
            key="month-selection"
            show={showSelectMonthOrYear}
            className="top-none absolute h-full w-full bg-white"
          >
            <SlideContent
              ref={handleAddRef(CalendarSelectionEnum.MONTH)}
              onPageChange={handlePageChange(CalendarSelectionEnum.MONTH)}
              render={(page) => (
                <MonthList
                  selectedDate={selectedDate}
                  month={addYears(calendar.date, page)}
                  onSelect={handleSelect(CalendarSelectionEnum.MONTH)}
                  nextTabIndexDate={calendar.date}
                  onFocusChange={handleFocusChange}
                  disableTabIndex={showYearSelection}
                />
              )}
            />
          </Animated>
          <Animated
            animation="zoom"
            key="year-selection"
            show={showYearSelection}
            className="top-none absolute h-full w-full bg-white"
          >
            <SlideContent
              ref={handleAddRef(CalendarSelectionEnum.YEAR)}
              onPageChange={handlePageChange(CalendarSelectionEnum.YEAR)}
              render={(page) => (
                <YearList
                  year={addYears(calendar.date, 12 * page)}
                  selectedDate={selectedDate}
                  onSelect={handleSelect(CalendarSelectionEnum.YEAR)}
                  nextTabIndexDate={calendar.date}
                  onFocusChange={handleFocusChange}
                />
              )}
            />
          </Animated>
        </div>
      </div>
    </FloatMenu>
  );
}

export default DesktopSelector;
