import { useCallback, useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import MaterialTopTab from 'src/components/MaterialTopTab';
import {
  LogField,
  LogFieldTypes,
  LogTab,
  LOG_TAB_TITLES,
  LogType,
  Stages,
} from 'src/screens/LogScreen/const';
import ScreenView from 'src/components/PageView';
import { LogStackScreenProps } from 'src/routes/types';
import { Route } from 'src/routes/const';
import ImagePicker, { LogImage } from 'src/components/ImagePicker';
import KeyboardAwareScrollView from 'src/components/KeyboardAwareScrollView';
import { useLog } from 'src/hooks/useLog';
import { randomUUID } from 'expo-crypto';
import SaveButton from './SaveButton';
import TimelineTab from './TimelineTab';
import InformationTab from './InformationTab';
import { ThrownStage, getDefaultThrownStage } from './TimelineTab/Profiles/Thrown/const';
import { getDefaultHandbuildStage } from './TimelineTab/Profiles/Handbuild/const';

const DEFAULT_TITLE = 'Untitled';

export default function LogScreen({ navigation }: LogStackScreenProps<Route.LOG>) {
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [images, setImages] = useState<LogImage[]>([]);
  const [type, setType] = useState<LogType>(LogType.THROW);
  const [stage, setStage] = useState<Stages>({
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
      [LogField.TYPE]: LogType.THROW,
      [LogField.STAGE]: getDefaultThrownStage(),
    },
  });
  const { createLog } = useLog();

  const onSaveLog = useCallback(
    (log: LogFieldTypes) => {
      createLog?.({
        ...log,
        [LogField.LID]: randomUUID(),
        [LogField.IMAGES]: images,
        [LogField.TYPE]: type,
        [LogField.STAGE]: stage,
      });
    },
    [createLog, images, stage, type],
  );
  const onSetTitle = useCallback((newTitle: string) => setTitle(newTitle), []);
  const onSetImages = useCallback((newImages: LogImage[]) => setImages(newImages), []);
  const onSetType = useCallback((newType: LogType) => {
    setType(newType);
    // Reset Stages
    switch (newType) {
      case LogType.HANDBUILD:
        setStage(getDefaultHandbuildStage());
        break;
      case LogType.THROW:
      default:
        setStage(getDefaultThrownStage());
    }
  }, []);
  const onSetStage = useCallback((newStage: Stages) => setStage(newStage), []);

  // TABS
  const Timeline = useCallback(
    () => <TimelineTab type={type} setType={onSetType} stage={stage} setStage={onSetStage} />,
    [type, stage, onSetStage, onSetType],
  );
  // TODO: TYPE
  const Information = useCallback(
    () => (
      <KeyboardAwareScrollView>
        <InformationTab control={control} errors={errors} setTitle={onSetTitle} />
      </KeyboardAwareScrollView>
    ),
    [control, errors, onSetTitle],
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
        extra: <SaveButton onPress={handleSubmit((data) => onSaveLog(data))} />,
      }}
    >
      <ImagePicker images={images} setImages={onSetImages} />
      <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TAB_TITLES} />
    </ScreenView>
  );
}
