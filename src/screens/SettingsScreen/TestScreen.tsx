import { useNavigation } from '@react-navigation/native';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import ScreenView from 'src/components/PageView';
import Text from 'src/components/Text';
import { ROUTES_TITLE, Route } from 'src/routes/const';
import { SettingsNavigationProps, SettingsStackScreenProps } from 'src/routes/types';

const TestScreen = ({ navigation, route }: SettingsStackScreenProps<Route.TEST_SCREEN>) => {
  const { id, optional = 'default' } = route.params || {};
  const qer = route.params.id;
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
        <TestComponent />
      </View>
    </ScreenView>
  );
};

const TestComponent = () => {
  const navigation = useNavigation<SettingsNavigationProps<Route.TEST_SCREEN>>();
  const onPress = () => {
    navigation.navigate(Route.SETTINGS);
  };
  return (
    <View style={styles.container}>
      <Button title={'Go to settings'} onPress={onPress} />
    </View>
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
