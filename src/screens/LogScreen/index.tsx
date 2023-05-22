import { useCallback, useState } from 'react';
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
import { useActionSheet } from '@expo/react-native-action-sheet';
import LogFieldClass from 'src/lib/realm/LogField';
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
  const { log, updateLog, deleteLog } = useLog(route.params.lid);
  const [images, setImages] = useState<LogImageType[]>(log?.images ?? []);
  const [type, setType] = useState<LogType>(log?.type ?? LogType.THROW);
  const [stage, setStage] = useState<Stages[]>(log?.stage ?? getDefaultThrownStage());

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<LogFieldTypes>({
    // TODO: Stage Profile
    defaultValues: JSON.parse(JSON.stringify(log)),
  });
  const onDeleteLog = useCallback(() => {
    deleteLog();
    navigation.pop();
  }, [deleteLog, navigation]);
  const onSaveInformation = useCallback(
    (updatedLog: Partial<LogFieldClass>) => {
      updateLog({ ...log, ...updatedLog });
      reset({}, { keepValues: true });
    },
    [log, reset, updateLog],
  );
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
          onSetStage(getDefaultHandbuildStage());
          break;
        case LogType.THROW:
        default:
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
          <InformationTab control={control} errors={errors} />
        </KeyboardAwareScrollView>
        {isDirty && (
          <View style={styles.saveContainer}>
            <TouchableOpacity
              onPress={handleSubmit(onSaveInformation)}
              style={{ ...styles.saveButton, backgroundColor: currentPrimaryColor }}
            >
              <Icon name="save" color={COLORS[Color.NEUTRAL_10]} />
            </TouchableOpacity>
          </View>
        )}
      </>
    ),
    [control, currentPrimaryColor, errors, handleSubmit, isDirty, onSaveInformation],
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

  // More Options
  const { showActionSheetWithOptions } = useActionSheet();
  const onPressMore = () => {
    //  TODO : SHARE
    // const options = ['Share', 'Delete', 'Cancel'];
    //  const destructiveButtonIndex = 1;
    //  const cancelButtonIndex = 2;
    const options = ['Delete', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (i?: number) => {
        switch (i) {
          case 0:
            // TODO: Share
            // TODO: Copy
            break;
          case destructiveButtonIndex:
            // Delete
            onDeleteLog();
            break;
          case cancelButtonIndex:
          default:
          // Canceled
        }
      },
    );
  };

  return (
    <ScreenView
      headerProps={{
        onBack: () => navigation.pop(),
        title: log?.[LogField.TITLE],
        extra: <MoreButton onPress={onPressMore} />,
      }}
    >
      <ImagePicker images={images} setImages={onSetImages} />
      <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TAB_TITLES} />
    </ScreenView>
  );
}
