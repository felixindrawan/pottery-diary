import { useForm } from 'react-hook-form';
import MaterialTopTab from 'src/components/Navigation/MaterialTopTab';
import {
  LogField,
  LogFieldTypes,
  LogTab,
  LOG_TAB_TITLES,
  ThrownStage,
} from 'src/pages/CreateLogPage/const';
import { useCallback } from 'react';
import { InformationTab } from './InformationTab';
import { TimelineTab } from './TimelineTab';

export default function CreateLogStack() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogFieldTypes>({
    // TODO: Change default values for stage based on type
    defaultValues: {
      [LogField.TITLE]: 'Untitled',
      [LogField.STAGE]: {
        [ThrownStage.THROWN]: {
          date: 'Today',
        },
      },
    },
  });
  const Timeline = useCallback(() => <TimelineTab control={control} errors={errors} />, []);
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

  return <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TAB_TITLES} />;
}
