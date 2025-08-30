interface UseInfiniteWheelProps {
  itens: (string | number)[];
  name: string;
  selected?: number;
  onChange?: (item: number) => void;
}

export type { UseInfiniteWheelProps };
