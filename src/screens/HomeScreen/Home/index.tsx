import { Switch, View } from 'react-native';
import Text from 'src/components/Text';
import { useLog } from 'src/hooks/useLog';
import { Mode, useTheme } from 'src/hooks/useTheme';

export default function Home() {
  const { currentTheme, onThemeUpdate } = useTheme();
  const { logs } = useLog();
  return (
    <View>
      <Text>
        Light Mode: <Switch onValueChange={onThemeUpdate} value={currentTheme === Mode.Light} />
      </Text>
      {logs?.map((log) => (
        <Text key={log.lid}>
          {log.title} {log.lid}
        </Text>
      ))}
    </View>
  );
}
