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
import ImagePicker, { LogImage } from 'src/components/ImagePicker';
import KeyboardAwareScrollView from 'src/components/KeyboardAwareScrollView';
import SaveButton from './SaveButton';
import TimelineTab from './TimelineTab';
import InformationTab from './InformationTab';

const DEFAULT_TITLE = 'Untitled';

export default function LogScreen({ navigation }: LogStackScreenProps<Route.LOG>) {
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [images, setImages] = useState<LogImage[]>([]);
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
      [LogField.TITLE]: title,
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
  const Timeline = useCallback(
    () => (
      <KeyboardAwareScrollView>
        <TimelineTab stage={stage} setStage={setStage} />
      </KeyboardAwareScrollView>
    ),
    [stage],
  );
  // TODO: TYPE
  const Information = useCallback(
    () => (
      <KeyboardAwareScrollView>
        <InformationTab control={control} errors={errors} />
      </KeyboardAwareScrollView>
    ),
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
