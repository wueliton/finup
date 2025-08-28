interface UseMonthListProps {
  month: Date;
  selectedDate?: Date | null;
  onSelect?: (date: Date) => void;
}

export type { UseMonthListProps };
