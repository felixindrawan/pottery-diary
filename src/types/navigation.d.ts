declare global {
  type RootStackParamList = {};
  type HomeStackParamList = {
    Home: undefined;
  };
  type LogStackParamList = {
    Log: undefined;
  };
  type SettingsStackParamList = {
    Settings: undefined;
  };
  type BottomTabParamList = {};

  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
  // SCREENS - specific screens props
  // You can get navigation or route prop for every screen f. eg.
  // - HomeScreenNavigationProps['route']
  // - HomeScreenNavigationProps['navigation']

  type BottomTabScreenProps = BaseBottomTabScreenProps<
    MainTabParamList,
    'ExamplesStack' | 'HomeStack'
  >;

  // Root stack
  type RootStackScreenProps = RootStackComposite;

  // Home stack
  type HomeScreenProps = HomeStackComposite<'Home'>;
  type DetailsScreenProps = HomeStackComposite<'Details'>;

  // Examples stack
  type ExamplesScreenProps = ExamplesStackComposite<'Examples'>;
  type ComponentsScreenProps = ExamplesStackComposite<'Components'>;
}

type RootStackComposite<S extends keyof RootStackParamList = keyof RootStackParamList> =
  CompositeScreenProps<
    StackScreenProps<RootStackParamList, S>,
    BottomTabScreenProps<MainTabParamList>
  >;

type HomeStackComposite<S extends keyof HomeStackParamList> = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<HomeStackParamList, S>,
    BottomTabScreenProps<MainTabParamList, 'HomeStack'>
  >,
  StackScreenProps<RootStackParamList, 'MainTab'>
>;

type ExamplesStackComposite<S extends keyof ExampleStackParamList> = CompositeScreenProps<
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'ExamplesStack'>,
    StackScreenProps<ExampleStackParamList, S>
  >,
  StackScreenProps<RootStackParamList, 'MainTab'>
>;
