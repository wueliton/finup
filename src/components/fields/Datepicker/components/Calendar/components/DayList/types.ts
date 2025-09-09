interface DayListProps {
  selectedDay?: Date | null;
  listMonth: Date;
  nextTabIndexDate: Date;
  onSelect?: (day: Date) => void;
  onFocusChange?: (date: Date) => void;
}

export type { DayListProps };
