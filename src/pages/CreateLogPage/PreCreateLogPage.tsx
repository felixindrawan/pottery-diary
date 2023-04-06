import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Fragment, useEffect } from 'react';
import { RouteConstants } from 'src/routes/RouteConstants';

const PreCreateLogPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  navigation.replace(RouteConstants.logStack);
  return <Fragment></Fragment>;
};
export { PreCreateLogPage };
