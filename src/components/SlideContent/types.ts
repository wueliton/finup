interface SlideContentProps {
  onPageChange?: (page: number) => void;
  render: (page: number) => React.JSX.Element;
}

interface SlideContentHandles {
  nextPage: () => void;
  previousPage: () => void;
}

export type { SlideContentHandles, SlideContentProps };
