import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Route } from 'src/routes/const';
import {
  LogField,
  LogFieldTypes,
  LogImageType,
  LogTab,
  LogType,
  Stages,
} from 'src/lib/realm/const';
import { useLog } from 'src/hooks/useLog';
import MaterialTopTab from 'src/components/MaterialTopTab';
import { LOG_TAB_TITLES } from 'src/screens/LogScreen/const';
import ScreenView from 'src/components/PageView';
import { LogStackScreenProps } from 'src/routes/types';
import ImagePicker from 'src/components/ImagePicker';
import KeyboardAwareScrollView from 'src/components/KeyboardAwareScrollView';
import MoreButton from 'src/components/Button/MoreButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'src/hooks/useTheme';
import { COLORS, Color } from 'src/utils/styles';
import Icon from 'src/components/Icon';
import View from 'src/components/View';
import { StyleSheet } from 'react-native';
import TimelineTab from './TimelineTab';
import InformationTab from './InformationTab';
import { getDefaultThrownStage } from './TimelineTab/Profiles/Thrown/const';
import { getDefaultHandbuildStage } from './TimelineTab/Profiles/Handbuild/const';

const styles = StyleSheet.create({
  saveContainer: {
    position: 'absolute',
    right: 50,
    bottom: 50,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    elevation: 4,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});

export default function LogScreen({ route, navigation }: LogStackScreenProps<Route.LOG>) {
  const { currentPrimaryColor } = useTheme();

  const { log, updateLog } = useLog(route.params?.lid);
  const [images, setImages] = useState<LogImageType[]>(log?.images ?? []);
  const [type, setType] = useState<LogType>(log?.type ?? LogType.THROW);
  const [stage, setStage] = useState<Stages[]>(log?.stage ?? getDefaultThrownStage());

  const [logInformation, setLogInformation] = useState<Partial<LogFieldTypes>>({
    ...JSON.parse(JSON.stringify(log)),
  });
  const onSetInformation = useCallback(
    (field: keyof LogFieldTypes, newValue: LogFieldTypes) => {
      console.log(newValue, typeof newValue);
      setLogInformation({ ...logInformation, [field]: newValue });
    },
    [logInformation],
  );
  console.log(logInformation);
  // const onSubmit = useCallback((data) => updateLog({ ...log, ...data }), [log, updateLog]);
  // useEffect(() => {
  //   const subscription = watch(() => handleSubmit(onSubmit)());
  //   return () => subscription.unsubscribe();
  // }, [handleSubmit, onSubmit, watch]);

  // const onSetTitle = useCallback((newTitle: string) => setTitle(newTitle), []);
  const onSaveInformation = useCallback(() => {
    updateLog({ ...log, ...logInformation });
  }, [log, logInformation]);
  const onSetImages = useCallback(
    (newImages: LogImageType[]) => {
      setImages(newImages);
      updateLog({ ...log, [LogField.IMAGES]: newImages });
    },
    [log, updateLog],
  );
  const onSetStage = useCallback(
    (newStage: Stages[]) => {
      setStage(newStage);
      updateLog({ ...log, [LogField.STAGE]: newStage });
    },
    [log, updateLog],
  );
  const onSetType = useCallback(
    (newType: LogType) => {
      setType(newType);
      updateLog({ ...log, [LogField.TYPE]: newType });
      // Reset Stages
      switch (newType) {
        case LogType.HANDBUILD:
          // updateLog(getDefaultHandbuildStage());
          onSetStage(getDefaultHandbuildStage());
          break;
        case LogType.THROW:
        default:
          // updateLog(getDefaultHandbuildStage());
          onSetStage(getDefaultThrownStage());
      }
    },
    [log, onSetStage, updateLog],
  );
  // TABS
  const Timeline = useCallback(
    () => <TimelineTab type={type} setType={onSetType} stages={stage} setStages={onSetStage} />,
    [type, stage, onSetStage, onSetType],
  );
  // TODO: TYPE
  const Information = useCallback(
    () => (
      <>
        <KeyboardAwareScrollView>
          <InformationTab
            information={logInformation}
            setInformation={onSetInformation}
            onSave={onSaveInformation}
          />
        </KeyboardAwareScrollView>
        <View style={styles.saveContainer}>
          <TouchableOpacity
            onPress={onSaveInformation}
            style={{ ...styles.saveButton, backgroundColor: currentPrimaryColor }}
          >
            <Icon name="save" color={COLORS[Color.NEUTRAL_10]} />
          </TouchableOpacity>
        </View>
      </>
    ),
    [currentPrimaryColor, logInformation, onSaveInformation, onSetInformation],
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
        title: logInformation?.[LogField.TITLE],
        extra: <MoreButton onPress={() => {}} />,
      }}
    >
      <ImagePicker images={images} setImages={onSetImages} />
      <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TAB_TITLES} />
    </ScreenView>
  );
}
