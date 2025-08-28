import Icon from "components/Icon";
import { memo } from "react";
import { NavLink } from "react-router";
import { menuButtonStyles } from "./styles";
import type { MenuButtonProps } from "./types";

function MenuButton({ to, icon, title }: MenuButtonProps) {
  const { container, iconContainer } = menuButtonStyles();

  return (
    <li className="flex">
      <NavLink
        end
        to={to}
        className={({ isActive }) => container({ isActive })}
        title={title}
      >
        <Icon name={icon} className={iconContainer()} />
        <span className="sr-only">{title}</span>
      </NavLink>
    </li>
  );
}

export default memo(MenuButton);
