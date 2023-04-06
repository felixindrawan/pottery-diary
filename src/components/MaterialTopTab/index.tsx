import { ReactNode } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Text from 'src/components/Text';
import { getBGColor, getColor, useTheme } from 'src/hooks/useTheme';
import { Size } from 'src/utils/styles';

interface MaterialTopTabProps {
  TABS: {
    name: string;
    component: () => ReactNode;
  }[];
  LABELS: {
    [x: string]: string;
  };
}

const Tab = createMaterialTopTabNavigator();
// TODO: Interface
export default function MaterialTopTab({ TABS, LABELS }: MaterialTopTabProps) {
  const { currentTheme, currentPrimaryColor } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
    marginBottom: 20,
  };
  const labelStyle = (focused: boolean) => ({
    color: focused ? currentPrimaryColor : getColor(currentTheme),
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabel: ({ children, focused }) => (
          <Text size={Size.LG} style={labelStyle(focused)}>
            {LABELS[children]}
          </Text>
        ),
        tabBarStyle: style,
        tabBarIndicatorStyle: { backgroundColor: currentPrimaryColor },
      }}
    >
      {TABS.map(({ name, component }) => (
        // @ts-ignore TODO
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
}
