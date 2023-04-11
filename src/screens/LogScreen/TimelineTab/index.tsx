import { StyleSheet } from 'react-native';
import View from 'src/components/View';
import {
  sortStages,
  LOG_TYPES,
  LogType,
  Stages,
  StageProperties,
} from 'src/screens/LogScreen/const';
import KeyboardAwareScrollView from 'src/components/KeyboardAwareScrollView';
import { Dropdown } from 'react-native-element-dropdown';
import { RADIUS } from 'src/utils/styles';
import { getColor, useTheme } from 'src/hooks/useTheme';
import Thrown from './Profiles/Thrown/Stage';
import Handbuild from './Profiles/Handbuild/Stage';
import {
  THROWN_ORDER,
  ThrownStage,
  ThrownStages,
  onThrownNextStage,
  onThrownPreviousStage,
} from './Profiles/Thrown/const';
import {
  HANDBUILD_ORDER,
  HandbuildStage,
  HandbuildStages,
  onHandbuildNextStage,
  onHandbuildPreviousStage,
} from './Profiles/Handbuild/const';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dropdownInputContainer: {
    borderRadius: RADIUS,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

interface TimelineTabProps {
  type: LogType;
  setType: (newStage: LogType) => void;
  stage: Stages;
  setStage: (newStage: Stages) => void;
}

export default function TimelineTab({ stage, setStage, type, setType }: TimelineTabProps) {
  const { currentTheme, currentPrimaryColor } = useTheme();

  return (
    <View style={styles.container}>
      <Dropdown
        value={type}
        onChange={(item) => setType(item.value)}
        labelField="label"
        valueField="value"
        data={Object.values(LogType).map((t) => ({
          label: LOG_TYPES[t as LogType],
          value: t,
        }))}
        style={{
          ...styles.dropdownInputContainer,
          borderWidth: 2,
          borderColor: currentPrimaryColor,
        }}
        selectedTextStyle={{
          color: getColor(currentTheme),
        }}
        itemContainerStyle={{
          borderRadius: RADIUS,
        }}
      />
      <KeyboardAwareScrollView>
        {type === LogType.HANDBUILD
          ? sortStages<HandbuildStage>(stage, HANDBUILD_ORDER).map((s, i) => (
              <Handbuild
                key={s}
                stage={s}
                stageProps={(stage as HandbuildStages)[s] as StageProperties}
                current={i === 0}
                onNextStage={() => onHandbuildNextStage(stage, setStage)}
                onPreviousStage={() => onHandbuildPreviousStage(stage, setStage)}
              />
            ))
          : sortStages<ThrownStage>(stage, THROWN_ORDER).map((s, i) => (
              <Thrown
                key={s}
                stage={s}
                stageProps={(stage as ThrownStages)[s] as StageProperties}
                current={i === 0}
                onNextStage={() => onThrownNextStage(stage, setStage)}
                onPreviousStage={() => onThrownPreviousStage(stage, setStage)}
              />
            ))}
      </KeyboardAwareScrollView>
    </View>
  );
}
