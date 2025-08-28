import Animated from "components/Animated";
import ButtonIcon from "components/ButtonIcon";
import FloatMenu from "components/FloatMenu";
import Icon from "components/Icon";
import { addMonths, addYears } from "date-fns";
import SlideContent from "../../SlideContent";
import Input from "../Input";
import DayList from "./components/DayList";
import MonthList from "./components/MonthList";
import YearList from "./components/YearList";
import { CalendarSelectionEnum } from "./contants";
import useDatepicker from "./hooks/useDatepicker";
import type { DatepickerPops } from "./types";

function Datepicker({
  label,
  onChange,
  onBlur,
  value,
  ...inputProps
}: DatepickerPops) {
  const {
    containerRef,
    selectedDate,
    calendar,
    pageLabel,
    showSelectMonthOrYear,
    showYearSelection,
    inputValue,
    handleOpenCalendar,
    handleSelectionType,
    handlePrevious,
    handleNext,
    handlePageChange,
    handleAddRef,
    handleSelect,
    handleKeyDown,
    handleOnChange,
    handleOnBlur,
  } = useDatepicker({
    onBlur,
    onChange,
    value,
  });

  return (
    <div
      className="relative select-none"
      ref={containerRef}
      onClick={handleOpenCalendar}
    >
      <Input
        {...inputProps}
        label={label}
        prefix={<Icon name="Calendar" className="text-black/50" />}
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      <FloatMenu
        isOpen={calendar.isOpen}
        containerRef={containerRef}
        className="gap-md flex min-w-2xl flex-col"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={handleSelectionType}
            className="cursor-pointer first-letter:capitalize"
          >
            {pageLabel}
          </button>
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
                listMonth={addMonths(calendar.date, page)}
                onSelect={handleSelect(CalendarSelectionEnum.DAY)}
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
                  />
                )}
              />
            </Animated>
          </div>
        </div>
      </FloatMenu>
    </div>
  );
}

export default Datepicker;
