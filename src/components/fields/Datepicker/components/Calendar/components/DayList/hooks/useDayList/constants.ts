import { KeyboardNavigateKeysEnum } from "../../../../hooks/useDesktopSelector/constants";

const daysKeysMap = {
  [KeyboardNavigateKeysEnum.ARROW_DOWN]: 7,
  [KeyboardNavigateKeysEnum.ARROW_LEFT]: -1,
  [KeyboardNavigateKeysEnum.ARROW_RIGHT]: 1,
  [KeyboardNavigateKeysEnum.ARROW_UP]: -7,
};

export { daysKeysMap };
