interface YearListProps {
  year: Date;
  selectedDate?: Date | null;
  onSelect?: (date: Date) => void;
}

export type { YearListProps };
