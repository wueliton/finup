import { type PropsWithChildren } from "react";
import MenuButton from "./Button";

function Menu({ children }: PropsWithChildren) {
  return (
    <nav aria-label="Menu principal">
      <ul className="gap-sm flex lg:flex-col">{children}</ul>
    </nav>
  );
}

Menu.Button = MenuButton;

export default Menu;
