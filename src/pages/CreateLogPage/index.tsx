import { StyleSheet } from 'react-native';
import View from 'src/components/View';
import Text from 'src/components/Text';
import MaterialTopTab from 'src/components/Navigation/MaterialTopTab';

enum LogTab {
  TIMELINE = 'timeline',
  INFORMATION = 'information',
}

export const LOG_TITLE: Record<LogTab, string> = {
  [LogTab.TIMELINE]: 'Timeline',
  [LogTab.INFORMATION]: 'Information',
};

const LOG_TABS = [
  {
    name: LogTab.TIMELINE,
    component: TempText,
  },
  {
    name: LogTab.INFORMATION,
    component: TempText,
  },
];

export default function CreateLogStack() {
  return <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TITLE} />;
}

function TempText() {
  return (
    <View style={styles.container}>
      <Text>Timeline</Text>
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
