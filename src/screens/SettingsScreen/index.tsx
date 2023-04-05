import { StyleSheet, Switch } from 'react-native';
import { Mode, useTheme } from 'src/hooks/useTheme';
import Text from 'src/components/Text';
import View from 'src/components/View';
import ScreenView from 'src/components/PageView';
import { Route, ROUTES_TITLE } from 'src/routes/const';

export default function SettingsScreen() {
  const { currentTheme, onThemeUpdate } = useTheme();
  return (
    <ScreenView
      headerProps={{
        title: ROUTES_TITLE[Route.SETTINGS],
      }}
    >
      <View style={styles.container}>
        <Text>Settings</Text>
        <Text>
          Light Mode: <Switch onValueChange={onThemeUpdate} value={currentTheme === Mode.Light} />
        </Text>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
