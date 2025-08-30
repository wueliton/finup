enum MediaQueryEnum {
  MIN_WIDTH = "minWidth",
  MAX_WIDTH = "maxWidth",
  WIDTH = "width",
}

const mediaToQuery = {
  [MediaQueryEnum.MAX_WIDTH]: "max-width",
  [MediaQueryEnum.MIN_WIDTH]: "min-width",
  [MediaQueryEnum.WIDTH]: "width",
};

export { MediaQueryEnum, mediaToQuery };
