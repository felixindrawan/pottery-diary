import { Fragment } from 'react';
import { Switch } from 'react-native';
import Text from 'src/components/Text';
import { Mode, useTheme } from 'src/hooks/useTheme';

export function Home() {
  const { currentTheme, onThemeUpdate } = useTheme();

  return (
    <Fragment>
      <Text>Home</Text>
      <Text>
        Light Mode: <Switch onValueChange={onThemeUpdate} value={currentTheme === Mode.Light} />
      </Text>
    </Fragment>
  );
}
