type ComponentEvent<Value> = {
  target: {
    value: Value | null | undefined;
  };
};

export type { ComponentEvent };
