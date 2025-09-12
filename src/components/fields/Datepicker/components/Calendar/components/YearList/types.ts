interface YearListProps {
  year: Date;
  selectedDate?: Date | null;
  nextTabIndexDate?: Date | null;
  onSelect?: (date: Date) => void;
  onFocusChange?: (date: Date) => void;
}

export type { YearListProps };
