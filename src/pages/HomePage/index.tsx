import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import View from 'src/components/View';
import { Home } from './Home';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home />
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
