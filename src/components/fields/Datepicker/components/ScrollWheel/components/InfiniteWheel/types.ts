interface InfiniteWheelProps {
  itens: (string | number)[];
  name: string;
  selected?: number;
  onChange?: (item: number) => void;
}

export type { InfiniteWheelProps };
