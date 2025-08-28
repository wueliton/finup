type ComponentEvent<Value = unknown> = {
  target: {
    value: Value | null | undefined;
  };
};

export type { ComponentEvent };
