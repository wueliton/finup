import type { ComponentEvent } from "types/component-event";

function getComponentEvent<Value>(value: Value): ComponentEvent<Value> {
  return {
    target: {
      value,
    },
  };
}

export default getComponentEvent;
