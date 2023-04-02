import { StyleSheet } from 'react-native';
import { FieldErrors } from 'react-hook-form';
import View from 'src/components/View';
import {
  getCurrentStage,
  LogFieldTypes,
  sortStages,
  ThrownStage,
  ThrownStages,
  THROWN_ORDER,
} from 'src/pages/CreateLogPage/const';
import { FormFieldProps } from 'src/components/FormField';
import { Stage } from './Stage';
import { Dispatch, useState } from 'react';
import moment from 'moment';
import { reverseObject } from 'src/utils/transform/ObjectTransform';

interface TimelineTabProps extends Partial<FormFieldProps<LogFieldTypes>> {
  errors: FieldErrors<LogFieldTypes>;
}

export function TimelineTab({ control, errors }: TimelineTabProps) {
  const [stage, setStage] = useState<ThrownStages>({
    [ThrownStage.THROWN]: {
      date: moment(),
      notes: 'test',
    },
  });
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

// Helper Functions
function onNextStage(stages: ThrownStages, setCurrentStage: Dispatch<ThrownStages>): void {
  // TODO: Stage Profile
  const currentStage = getCurrentStage(stages);
  if (currentStage === ThrownStage.FINISHED) {
    return; // Can't go next on FINISHED
  } else {
    const STAGE_ORDER = reverseObject(THROWN_ORDER);
    setCurrentStage({
      ...stages,
      [STAGE_ORDER[THROWN_ORDER[currentStage] + 1]]: {
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
    return; // Can't go prev on TODO
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

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
});

// let newStage: ThrownStage;
// switch (currentStage[0]) {
//   case ThrownStage.TODO:
//     newStage = ThrownStage.THROWN;
//     break;
//   case ThrownStage.THROWN:
//     newStage = ThrownStage.TRIMMED;
//     break;
//   case ThrownStage.TRIMMED:
//     newStage = ThrownStage.BISQUED;
//     break;
//   case ThrownStage.BISQUED:
//     newStage = ThrownStage.GLAZED;
//     break;
//   case ThrownStage.GLAZED:
//     newStage = ThrownStage.FINISHED;
//     break;
//   case ThrownStage.FINISHED:
//     return; // Can't go next on Finished
//   default:
//     break;
// }
