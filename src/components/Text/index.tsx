import { ReactNode } from 'react';
import { Text as RNText } from 'react-native';
import { TextProps as RNTextProps } from 'react-native/Libraries/Text/Text';
import { getColor, Mode, useTheme } from 'src/hooks/useTheme';
import { Color, COLORS, FONT_SIZES, Size } from 'src/utils/styles';

interface TextProps extends RNTextProps {
  children?: ReactNode;
  size?: Size;
}

export default function Text({ children, size = Size.MD, ...otherProps }: TextProps) {
  const { currentTheme } = useTheme();
  const { style, ...props } = otherProps;

  return (
    <RNText
      style={{
        fontSize: FONT_SIZES[size],
        color: getColor(currentTheme),
        ...(style as StyleSheet),
      }}
      {...props}
    >
      {children}
    </RNText>
  );
}
