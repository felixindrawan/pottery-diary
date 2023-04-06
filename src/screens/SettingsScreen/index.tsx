import { APP_ENV } from '@env';
import { Button, StyleSheet, Switch } from 'react-native';
import ScreenView from 'src/components/PageView';
import Text from 'src/components/Text';
import View from 'src/components/View';
import { Mode, useTheme } from 'src/hooks/useTheme';
import { ROUTES_TITLE, Route } from 'src/routes/const';
import { SettingsStackScreenProps } from 'src/routes/types';

const SettingsScreen = ({ navigation }: SettingsStackScreenProps<Route.SETTINGS>) => {
  const { currentTheme, onThemeUpdate } = useTheme();
  const navigateToTestScreen = () => {
    navigation.navigate(Route.TEST_SCREEN, { id: '12313' });
  };
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
        {APP_ENV == 'dev' ? (
          <Button title={'Go to test screen'} onPress={navigateToTestScreen} />
        ) : null}
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SettingsScreen };
