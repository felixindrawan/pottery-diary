import { View, StyleSheet, Button, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Mode, useTheme } from 'src/hooks/useTheme';
import Text from 'src/components/Text';
import { Color, COLORS } from 'src/utils/styles';

export default function HomePage() {
  const { currentTheme, onThemeUpdate } = useTheme();
  return (
    <View style={{ ...styles.container, ...getThemedStyle(currentTheme) }}>
      <StatusBar style="auto" />
      <Text>Home</Text>
      <Switch onValueChange={onThemeUpdate} value={currentTheme === Mode.Dark} />
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

function getThemedStyle(currentTheme: Mode) {
  return {
    backgroundColor:
      currentTheme === Mode.Light ? COLORS[Color.NEUTRAL_10] : COLORS[Color.NEUTRAL_100],
    color: currentTheme === Mode.Light ? COLORS[Color.NEUTRAL_100] : COLORS[Color.NEUTRAL_10],
  };
}
