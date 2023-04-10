import { useCallback, useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import MaterialTopTab from 'src/components/MaterialTopTab';
import {
  LogField,
  LogFieldTypes,
  LogTab,
  LOG_TAB_TITLES,
  ThrownStage,
  ThrownStages,
} from 'src/screens/LogScreen/const';
import ScreenView from 'src/components/PageView';
import { LogStackScreenProps } from 'src/routes/types';
import { Route } from 'src/routes/const';
import ImagePicker from 'src/components/ImagePicker';
import SaveButton from './SaveButton';
import TimelineTab from './TimelineTab';
import InformationTab from './InformationTab';

const DEFAULT_TITLE = 'Untitled';

export default function LogScreen({ navigation }: LogStackScreenProps<Route.LOG>) {
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [images, setImages] = useState<string[]>([]);
  const [stage, setStage] = useState<ThrownStages>({
    [ThrownStage.THROWN]: {
      date: moment(),
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogFieldTypes>({
    // TODO: Stage Profile
    defaultValues: {
      [LogField.TITLE]: DEFAULT_TITLE,
      [LogField.STAGE]: {
        [ThrownStage.THROWN]: {
          date: moment(),
        },
      },
    },
  });

  const onSaveLog = useCallback(() => {
    // handleSubmit();
  }, []);
  const Timeline = useCallback(() => <TimelineTab stage={stage} setStage={setStage} />, [stage]);
  // TODO: TYPE
  const Information = useCallback(
    () => <InformationTab control={control} errors={errors} />,
    [control, errors],
  );
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
        title,
        extra: <SaveButton onPress={onSaveLog} />,
      }}
    >
      <ImagePicker images={images} setImages={setImages} />
      <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TAB_TITLES} />
    </ScreenView>
  );
}
