interface UseDayListProps {
  selectedDay?: Date | null;
  listMonth: Date;
  onSelect?: (day: Date) => void;
}

export type { UseDayListProps };
