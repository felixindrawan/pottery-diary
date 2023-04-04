import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { HeaderTitle, HeaderTitleProps } from 'src/components/PageHeader';
import View from 'src/components/View';

interface ScreenView {
  headerProps: HeaderTitleProps;
  children: ReactNode;
}

export default function ScreenView({ children, headerProps }) {
  return (
    <View style={styles.container}>
      <HeaderTitle {...headerProps} />
      {children}
    </View>
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
