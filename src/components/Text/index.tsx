import { ReactNode } from 'react';
import { Text as RNText } from 'react-native';
import { Mode, useTheme } from 'src/hooks/useTheme';
import { Color, COLORS, FONT_SIZES, Size } from 'src/utils/styles';

interface TextProps {
  children?: ReactNode;
  size?: Size;
}

export default function Text({ children, size = Size.MD, ...otherProps }: TextProps) {
  const { currentTheme } = useTheme();
  return (
    <RNText
      style={{
        fontSize: FONT_SIZES[size],
        color: currentTheme === Mode.Light ? COLORS[Color.NEUTRAL_100] : COLORS[Color.NEUTRAL_10],
      }}
      {...otherProps}
    >
      {children}
    </RNText>
  );
}
