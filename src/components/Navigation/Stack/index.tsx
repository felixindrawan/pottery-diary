import { ReactNode } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from 'src/components/Navigation/BottomTab';
import CreateLogStack from 'src/pages/CreateLogPage';
import { HeaderTitle } from 'src/components/PageHeader';
import { getBGColor, getColor, useTheme } from 'src/hooks/useTheme';
import SaveButton from 'src/pages/CreateLogPage/SaveButton';

export enum Stack {
  BOTTOM_TAB = 'bottomTabStack',
  CREATE_LOG = 'createLogStack',
}

export const STACK_TITLE: Record<Stack, string> = {
  [Stack.BOTTOM_TAB]: 'Bottom Stack',
  [Stack.CREATE_LOG]: 'Untitled',
};

const StackNav = createStackNavigator();
export default function StackNavigation() {
  const { currentTheme } = useTheme();
  const style = {
    backgroundColor: getBGColor(currentTheme),
  };
  return (
    <StackNav.Navigator>
      {STACKS.map(({ name, component, options, extra }) => (
        <StackNav.Screen
          key={name}
          name={name}
          component={component as any} //TODO: Fix type
          options={{
            // Page Header Options
            headerTitle: () => <HeaderTitle title={STACK_TITLE[name] ?? name} />,
            headerRight: extra,
            headerTintColor: getColor(currentTheme),
            headerShadowVisible: false,
            headerStyle: style,
            presentation: 'modal',
            ...options,
          }}
        />
      ))}
    </StackNav.Navigator>
  );
}

type StackProps = {
  name?: Stack;
  component?: () => ReactNode;
  options?: any; // TODO: Fix type
  extra?: any; // TODO: Fix type
};

const STACKS: StackProps[] = [
  {
    name: Stack.BOTTOM_TAB,
    component: BottomTabNavigation,
    options: {
      headerShown: false,
    },
  },
  {
    name: Stack.CREATE_LOG,
    component: CreateLogStack,
    extra: SaveButton,
  },
];
