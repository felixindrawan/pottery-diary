import { StyleSheet, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Mode, useTheme } from 'src/hooks/useTheme';
import Text from 'src/components/Text';
import View from 'src/components/View';

export default function ProfilePage() {
  const { currentTheme, onThemeUpdate } = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Profile</Text>
      <Text>
        Light Mode: <Switch onValueChange={onThemeUpdate} value={currentTheme === Mode.Light} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
