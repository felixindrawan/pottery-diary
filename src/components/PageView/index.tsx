import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HeaderTitle, HeaderTitleProps } from 'src/components/PageHeader';
import { getBGColor, useTheme } from 'src/hooks/useTheme';

interface ScreenViewProps {
  headerProps: HeaderTitleProps;
  children: ReactNode;
}

export default function ScreenView({ children, headerProps }: ScreenViewProps) {
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: getBGColor(currentTheme), flex: 1 }}
    >
      <HeaderTitle {...headerProps} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 0,
    gap: 15,
    flex: 1,
  },
});
