import { reverseObject } from 'src/utils/transform/ObjectTransform';
import { Dispatch } from 'react';
import { StageProperties, Stages, ThrownStage } from 'src/lib/realm/const';
import { getCurrentStage } from 'src/screens/LogScreen/const';

export const THROWN_ORDER: Record<ThrownStage, number> = {
  [ThrownStage.TODO]: 0,
  [ThrownStage.THROWN]: 1,
  [ThrownStage.TRIMMED]: 2,
  [ThrownStage.BISQUED]: 3,
  [ThrownStage.GLAZED]: 4,
  [ThrownStage.FINISHED]: 5,
};

export const THROWN_ACTION_LABEL: Record<ThrownStage, string> = {
  [ThrownStage.TODO]: 'To Do',
  [ThrownStage.THROWN]: 'Throwing',
  [ThrownStage.TRIMMED]: 'Trimming',
  [ThrownStage.BISQUED]: 'Bisque Firing',
  [ThrownStage.GLAZED]: 'Glaze Firing',
  [ThrownStage.FINISHED]: 'Finished',
};

export const THROWN_FINISHED_LABEL: Record<ThrownStage, string> = {
  [ThrownStage.TODO]: 'To Do',
  [ThrownStage.THROWN]: 'Thrown',
  [ThrownStage.TRIMMED]: 'Trimmed',
  [ThrownStage.BISQUED]: 'Bisqued',
  [ThrownStage.GLAZED]: 'Glazed',
  [ThrownStage.FINISHED]: 'Finished',
};

export function getDefaultThrownStage(): Stages[] {
  return [
    {
      [StageProperties.DATE]: new Date(),
      [StageProperties.STAGE]: ThrownStage.THROWN,
    },
  ] as Stages[];
}

export function onThrownNextStage(stages: Stages[], setCurrentStage: Dispatch<Stages[]>): void {
  const currentStage = getCurrentStage(stages, THROWN_ORDER);
  if (currentStage === ThrownStage.FINISHED) {
    // Can't go next on FINISHED
  } else {
    const STAGE_ORDER = reverseObject(THROWN_ORDER);
    const newStage = STAGE_ORDER[THROWN_ORDER[currentStage] + 1];
    setCurrentStage([
      ...stages.filter((s) => s.stage !== newStage),
      {
        [StageProperties.DATE]: new Date(),
        [StageProperties.STAGE]: STAGE_ORDER[THROWN_ORDER[currentStage] + 1],
      } as Stages,
    ]);
  }
}

export function onThrownPreviousStage(stages: Stages[], setCurrentStage: Dispatch<Stages[]>): void {
  const currentStage = getCurrentStage(stages, THROWN_ORDER);
  if (currentStage === ThrownStage.TODO) {
    // Can't go prev on TODO
  } else if (currentStage === ThrownStage.THROWN) {
    setCurrentStage([
      ...stages.filter((s) => s.stage !== ThrownStage.THROWN && s.stage !== ThrownStage.TODO),
      {
        [StageProperties.DATE]: new Date(),
        [StageProperties.STAGE]: ThrownStage.TODO,
      } as Stages,
    ]);
  } else {
    setCurrentStage(stages.filter((s) => s.stage !== currentStage));
  }
}
