import { createContext } from "react";
import type { ButtonToggleContextProps } from "./types";

const ButtonToggleContext = createContext<ButtonToggleContextProps>({});

export default ButtonToggleContext;
