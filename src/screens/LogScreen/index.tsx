import { useCallback } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import MaterialTopTab from 'src/components/MaterialTopTab';
import {
  LogField,
  LogFieldTypes,
  LogTab,
  LOG_TAB_TITLES,
  ThrownStage,
} from 'src/screens/LogScreen/const';
import { InformationTab } from './InformationTab';
import { TimelineTab } from './TimelineTab';
import ScreenView from 'src/components/PageView';
import { Route, ROUTES_TITLE } from 'src/routes/const';
import SaveButton from './SaveButton';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LogStackScreenProps } from 'src/routes/types';

export default function LogScreen({ navigation }: LogStackScreenProps<'logTab'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogFieldTypes>({
    // TODO: Stage Profile
    defaultValues: {
      [LogField.TITLE]: 'Untitled',
      [LogField.STAGE]: {
        [ThrownStage.THROWN]: {
          date: moment(),
        },
      },
    },
  });
  // @ts-ignore TODO: TYPE
  const Timeline = useCallback(() => <TimelineTab control={control} errors={errors} />, []);
  // @ts-ignore TODO: TYPE
  const Information = useCallback(() => <InformationTab control={control} errors={errors} />, []);
  const LOG_TABS = [
    {
      name: LogTab.TIMELINE,
      component: Timeline,
    },
    {
      name: LogTab.INFORMATION,
      component: Information,
    },
  ];

  return (
    <ScreenView
      headerProps={{
        onBack: () => navigation.pop(),
        title: ROUTES_TITLE[Route.LOG],
        extra: <SaveButton />,
      }}
    >
      <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TAB_TITLES} />
    </ScreenView>
  );
}
