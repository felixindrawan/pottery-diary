import { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import View from 'src/components/View';
import {
  getCurrentStage,
  sortStages,
  ThrownStage,
  ThrownStages,
  THROWN_ORDER,
} from 'src/screens/LogScreen/const';
import moment from 'moment';
import { reverseObject } from 'src/utils/transform/ObjectTransform';
import Stage from './Stage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

// Helper Functions
function onNextStage(stages: ThrownStages, setCurrentStage: Dispatch<ThrownStages>): void {
  // TODO: Stage Profile
  const currentStage = getCurrentStage(stages);
  if (currentStage === ThrownStage.FINISHED) {
    // Can't go next on FINISHED
  } else {
    const STAGE_ORDER = reverseObject(THROWN_ORDER);
    setCurrentStage({
      ...stages,
      [STAGE_ORDER[THROWN_ORDER[currentStage] + 1]]: {
        // @ts-ignore TODO
        ...stages[STAGE_ORDER[THROWN_ORDER[currentStage] + 1]],
        date: moment(),
      },
    });
  }
}

function onPreviousStage(stages: ThrownStages, setCurrentStage: Dispatch<ThrownStages>): void {
  // TODO: Stage Profile
  const currentStage = getCurrentStage(stages);
  if (currentStage === ThrownStage.TODO) {
    // Can't go prev on TODO
  } else if (currentStage === ThrownStage.THROWN) {
    setCurrentStage({
      ...stages,
      [ThrownStage.THROWN]: {
        ...stages[ThrownStage.THROWN],
        date: undefined,
      },
      [ThrownStage.TODO]: {
        date: stages?.[ThrownStage.TODO]?.date ?? moment(),
      },
    });
  } else {
    setCurrentStage({
      ...stages,
      [currentStage]: {
        ...stages[currentStage],
        date: undefined,
      },
    });
  }
}

interface TimelineTabProps {
  stage: ThrownStages;
  setStage: Dispatch<ThrownStages>;
}

export default function TimelineTab({ stage, setStage }: TimelineTabProps) {
  return (
    <View style={styles.container}>
      {sortStages(stage).map((s, i) => (
        <Stage
          key={s}
          stage={s}
          stageProps={stage[s]}
          current={i === 0}
          onNextStage={() => onNextStage(stage, setStage)}
          onPreviousStage={() => onPreviousStage(stage, setStage)}
        />
      ))}
    </View>
  );
}
