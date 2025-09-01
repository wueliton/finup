import { toggleStyle } from "./styles";
import type { ToggleProps } from "./types";

function Toggle<Value extends string>({
  children,
  value,
  disabled,
  onChange,
}: ToggleProps<Value>) {
  const { labelContent, input, toggle, toggleLabel } = toggleStyle();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const newValue = value ? value : checked;
    onChange?.({
      target: {
        value: newValue as Value,
      },
    });
  };

  return (
    <label className={labelContent()}>
      <input
        type="checkbox"
        value={value as Value}
        disabled={disabled}
        className={input()}
        onChange={handleChange}
      />
      <div className={toggle()} />
      <span className={toggleLabel()}>{children}</span>
    </label>
  );
}

export default Toggle;
