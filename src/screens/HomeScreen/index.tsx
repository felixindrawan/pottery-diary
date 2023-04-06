import { StyleSheet } from 'react-native';
import View from 'src/components/View';
import { Route, ROUTES_TITLE } from 'src/routes/const';
import ScreenView from 'src/components/PageView';
import SearchAndFilter from './SearchAndFilter';
import Home from './Home';

export default function HomeScreen() {
  return (
    <ScreenView
      headerProps={{
        title: ROUTES_TITLE[Route.HOME],
        extra: <SearchAndFilter />,
      }}
    >
      <View style={styles.container}>
        <Home />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
