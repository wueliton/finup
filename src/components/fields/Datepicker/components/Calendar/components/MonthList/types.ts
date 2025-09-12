interface MonthListProps {
  month: Date;
  selectedDate?: Date | null;
  nextTabIndexDate?: Date | null;
  disableTabIndex?: boolean;
  onSelect?: (date: Date) => void;
  onFocusChange?: (date: Date) => void;
}

export type { MonthListProps };
