export enum Color {
  NEUTRAL_10 = 'neutral10',
  NEUTRAL_50 = 'neutral50',
  NEUTRAL_100 = 'neutral100',
  PRIMARY_MAIN = 'primaryMain',
  RED = 'red',
}
export const COLORS: Record<Color, string> = {
  // Neutral Colors
  [Color.NEUTRAL_10]: '#ffffff',
  [Color.NEUTRAL_50]: '#bfbfbf',
  [Color.NEUTRAL_100]: '#262626',

  // Primary Colors
  [Color.PRIMARY_MAIN]: '#9777d7',

  // Errors
  [Color.RED]: '#cc0000',
};

export enum Size {
  XL = 'xl',
  LG = 'lg',
  MD = 'md',
  SM = 'sm',
  XS = 'xs',
}
export const FONT_SIZES: Record<Size, number> = {
  [Size.XL]: 34,
  [Size.LG]: 17,
  [Size.MD]: 15,
  [Size.SM]: 13,
  [Size.XS]: 10,
};

// https://stackoverflow.com/questions/19799777
export function getHexToAlpha(color: string, opacity: number) {
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}
