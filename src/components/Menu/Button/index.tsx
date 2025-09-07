import Icon from "components/Icon";
import { memo, useCallback } from "react";
import { NavLink, type NavLinkRenderProps } from "react-router";
import { menuButtonStyles } from "./styles";
import type { MenuButtonProps } from "./types";

function MenuButton({ to, icon, title }: MenuButtonProps) {
  const { container, iconContainer } = menuButtonStyles();

  const getClassName = useCallback(
    ({ isActive }: NavLinkRenderProps) => container({ isActive }),
    [container],
  );

  return (
    <li className="flex">
      <NavLink end to={to} className={getClassName} title={title}>
        <Icon name={icon} className={iconContainer()} />
        <span className="sr-only">{title}</span>
      </NavLink>
    </li>
  );
}

export default memo(MenuButton);
