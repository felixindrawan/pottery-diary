import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import ScreenView from 'src/components/PageView';
import Text from 'src/components/Text';
import { ROUTES_TITLE, Route } from 'src/routes/const';
import { SettingsStackScreenProps } from 'src/routes/types';
import { getBGColor, useTheme } from 'src/hooks/useTheme';

const TestScreen = ({ navigation, route }: SettingsStackScreenProps<'testScreen'>) => {
  const { id, optional = 'default' } = route.params;
  const onPress = () => {
    navigation.navigate(Route.SETTINGS);
  };
  return (
    <ScreenView
      headerProps={{
        title: ROUTES_TITLE[Route.TEST_SCREEN],
      }}
    >
      <View style={styles.container}>
        <Text>This is a test screen</Text>
        <View>
          <Text>ID: {id} </Text>
          <Text>Optional: {optional}</Text>
        </View>
        <Button title={'Go to settings'} onPress={onPress} />
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export { TestScreen };
