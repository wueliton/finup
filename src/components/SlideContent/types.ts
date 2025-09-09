interface SlideContentProps {
  onPageChange?: (page: number) => void;
  render: (page: number) => React.JSX.Element;
}

type SlideContentHandles = {
  nextPage: () => void;
  previousPage: () => void;
  element: HTMLDivElement | null;
};

export type { SlideContentHandles, SlideContentProps };
