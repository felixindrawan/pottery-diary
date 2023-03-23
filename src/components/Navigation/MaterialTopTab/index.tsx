import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Text from 'src/components/Text';
import { getBGColor, getColor, useTheme } from 'src/hooks/useTheme';
import { Size } from 'src/utils/styles';

const Tab = createMaterialTopTabNavigator();
// TODO: Interface
export default function MaterialTopTab({ TABS, LABELS }) {
  const { currentTheme, currentPrimaryColor } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
  };
  const labelStyle = (focused) => ({
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
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
}
