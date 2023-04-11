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
    getValues,
    setValue,
  } = useForm<LogFieldTypes>({
    // TODO: Stage Profile
    defaultValues: { ...getDefaultThrownStage(), [LogField.TITLE]: DEFAULT_TITLE },
  });

  const onSaveLog = useCallback(() => {
    // handleSubmit();
  }, []);
  const onSetImages = useCallback(
    (newImages: LogImage[]) => {
      setValue(LogField.IMAGES, newImages);
      setImages(newImages);
    },
    [setValue],
  );
  const onSetStage = useCallback(
    (newStage: Stages) => {
      setValue(LogField.STAGE, newStage);
      setStage(newStage);
    },
    [setValue],
  );
  const onSetType = useCallback(
    (newType: LogType) => {
      setValue(LogField.TYPE, newType);
      setType(newType);

      // Reset stages to default values
      switch (newType) {
        case LogType.THROW:
          onSetStage(getDefaultThrownStage());
          break;
        case LogType.HANDBUILD:
          onSetStage(getDefaultHandbuildStage());
          break;
        default:
          break;
      }
    },
    [onSetStage, setValue],
  );

  // TABS
  const Timeline = useCallback(
    () => <TimelineTab type={type} setType={onSetType} stage={stage} setStage={onSetStage} />,
    [onSetStage, stage, type, onSetType],
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
      <ImagePicker images={images} setImages={onSetImages} />
      <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TAB_TITLES} />
    </ScreenView>
  );
}
