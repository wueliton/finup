import Icon from "components/Icon";
import Input from "../Input";
import DesktopSelector from "./components/Calendar";
import ScrollWheel from "./components/ScrollWheel";
import useDatepicker from "./hooks/useDatepicker";
import type { DatepickerPops } from "./types";

function Datepicker({
  label,
  onChange,
  onBlur,
  value,
  className,
  ...inputProps
}: DatepickerPops) {
  const {
    containerRef,
    inputValue,
    selectedDate,
    isMobile,
    isOpen,
    handleOnChange,
    handleOnBlur,
    handleSelect,
    handleKeyDown,
    handleOpenCalendar,
    handleOnClose,
  } = useDatepicker({
    onBlur,
    onChange,
    value,
  });

  return (
    <div className={`relative select-none ${className}`} ref={containerRef}>
      <Input
        {...inputProps}
        label={label}
        prefix={<Icon name="Calendar" className="text-black/50" />}
        value={inputValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        readOnly={isMobile}
        onKeyDown={handleKeyDown}
        onClick={handleOpenCalendar}
      />
      {isMobile ? (
        <ScrollWheel
          selectedDate={selectedDate}
          isOpen={isOpen}
          onCancel={handleOnClose}
          onSelect={handleSelect}
        />
      ) : (
        <DesktopSelector
          selectedDate={selectedDate}
          onSelect={handleSelect}
          isOpen={isOpen}
          containerRef={containerRef}
        />
      )}
    </div>
  );
}

export default Datepicker;
