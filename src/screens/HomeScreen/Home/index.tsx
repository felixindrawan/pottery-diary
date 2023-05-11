import { useMemo } from 'react';
import { Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import KeyboardAwareScrollView from 'src/components/KeyboardAwareScrollView';
import Text from 'src/components/Text';
import { useQuery } from 'src/hooks/useRealm';
import { Mode, useTheme } from 'src/hooks/useTheme';
import LogFieldClass from 'src/lib/realm/LogField';
import { Route } from 'src/routes/const';
import { HomeStackScreenProps } from 'src/routes/types';

interface HomeProps {
  navigation: HomeStackScreenProps<Route.HOME>['navigation'];
}

export default function Home({ navigation }: HomeProps) {
  const { currentTheme, onThemeUpdate } = useTheme();
  const logs = useQuery(LogFieldClass);
  const DATA = useMemo(
    () =>
      logs.map((log) => ({
        key: log.lid?.toHexString(),
        title: log.title,
      })),
    [logs],
  );

  return (
    <KeyboardAwareScrollView>
      <Text>
        Light Modes: <Switch onValueChange={onThemeUpdate} value={currentTheme === Mode.Light} />
      </Text>
      {Array.from(logs)?.map((log) => (
        <TouchableOpacity
          key={log.lid?.toHexString()}
          onPress={() =>
            navigation.navigate(Route.LOG_STACK, {
              screen: Route.LOG,
              params: { lid: log.lid?.toHexString() },
            })
          }
        >
          <Text>
            {log?.title} {log.lid?.toHexString()}
          </Text>
        </TouchableOpacity>
      ))}
    </KeyboardAwareScrollView>
  );
}
