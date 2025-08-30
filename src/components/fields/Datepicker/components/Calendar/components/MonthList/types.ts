interface MonthListProps {
  month: Date;
  selectedDate?: Date | null;
  onSelect?: (date: Date) => void;
}

export type { MonthListProps };
