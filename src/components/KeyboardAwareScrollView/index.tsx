import { ReactNode } from 'react';
import {
  KeyboardAwareScrollView as RNKeyboardAwareScrollView,
  KeyboardAwareProps,
} from 'react-native-keyboard-aware-scroll-view';
import { getBGColor, useTheme } from 'src/hooks/useTheme';

interface KeyboardAwareScrollViewProps extends KeyboardAwareProps {
  children: ReactNode;
}
export default function KeyboardAwareScrollView({
  children,
  ...otherProps
}: KeyboardAwareScrollViewProps) {
  const { currentTheme } = useTheme();
  return (
    <RNKeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={150}
      style={{ backgroundColor: getBGColor(currentTheme) }}
      {...otherProps}
    >
      {children}
    </RNKeyboardAwareScrollView>
  );
}
