interface UseKeyboardNavigateProps {
  deltaX: number;
  deltaY: number;
  onSelect?: () => void;
  onFocusChange: (delta: number) => void;
}

export type { UseKeyboardNavigateProps };
