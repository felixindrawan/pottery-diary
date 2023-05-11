import { StyleSheet } from 'react-native';
import View from 'src/components/View';
import { sortStages, LOG_TYPES } from 'src/screens/LogScreen/const';
import KeyboardAwareScrollView from 'src/components/KeyboardAwareScrollView';
import { RADIUS } from 'src/utils/styles';
import { getColor, useTheme } from 'src/hooks/useTheme';
import { Dispatch } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { LogType, StageProperties, Stages } from 'src/lib/realm/const';
import Stage from './Stage';
import {
  THROWN_FINISHED_LABEL,
  THROWN_ORDER,
  onThrownNextStage,
  onThrownPreviousStage,
} from './Profiles/Thrown/const';
import {
  HANDBUILD_FINISHED_LABEL,
  HANDBUILD_ORDER,
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
  setType: Dispatch<LogType>;
  stages: Stages[];
  setStages: (newStage: Stages[]) => void;
}

export default function TimelineTab({ type, setType, stages, setStages }: TimelineTabProps) {
  const { currentTheme, currentPrimaryColor } = useTheme();
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
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
        {type === LogType.HANDBUILD
          ? sortStages(stages, HANDBUILD_ORDER).map((s, i) => (
              <Stage
                key={s[StageProperties.STAGE]}
                current={i === 0}
                currentStage={s}
                label={HANDBUILD_FINISHED_LABEL}
                onNextStage={() => onHandbuildNextStage(stages, setStages)}
                onPreviousStage={() => onHandbuildPreviousStage(stages, setStages)}
              />
            ))
          : sortStages(stages, THROWN_ORDER).map((s, i) => (
              <Stage
                key={s[StageProperties.STAGE]}
                current={i === 0}
                currentStage={s}
                label={THROWN_FINISHED_LABEL}
                onNextStage={() => onThrownNextStage(stages, setStages)}
                onPreviousStage={() => onThrownPreviousStage(stages, setStages)}
              />
            ))}
      </KeyboardAwareScrollView>
    </View>
  );
}
