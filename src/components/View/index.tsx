import { ReactNode } from 'react';
import { View as RNView } from 'react-native';
import { ViewProps as RNViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import { getBGColor, useTheme } from 'src/hooks/useTheme';

interface ViewProps extends RNViewProps {
  children?: ReactNode;
}

export default function View({ children, ...otherProps }: ViewProps) {
  const { currentTheme } = useTheme();
  const { style, ...props } = otherProps;

  return (
    <RNView
      style={{
        backgroundColor: getBGColor(currentTheme),
        ...(style as StyleSheet),
      }}
      {...props}
    >
      {children}
    </RNView>
  );
}
