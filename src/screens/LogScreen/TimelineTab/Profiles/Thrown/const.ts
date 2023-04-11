import moment from 'moment';
import { reverseObject } from 'src/utils/transform/ObjectTransform';
import { Dispatch } from 'react';
import { StageProperties, getCurrentStage } from '../../../const';

// Thrown consts
export enum ThrownStage {
  TODO = 'todo',
  THROWN = 'thrown',
  TRIMMED = 'trimmed',
  BISQUED = 'bisqued',
  GLAZED = 'glazed',
  FINISHED = 'finished',
}

export type ThrownStages = Partial<Record<ThrownStage, StageProperties>>;

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

export function getDefaultThrownStage() {
  return {
    [ThrownStage.THROWN]: {
      date: moment(),
    },
  };
}

export function onThrownNextStage(
  stages: ThrownStages,
  setCurrentStage: Dispatch<ThrownStages>,
): void {
  const currentStage = getCurrentStage(stages, THROWN_ORDER);
  if (currentStage === ThrownStage.FINISHED) {
    // Can't go next on FINISHED
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

export function onThrownPreviousStage(
  stages: ThrownStages,
  setCurrentStage: Dispatch<ThrownStages>,
): void {
  const currentStage = getCurrentStage(stages, THROWN_ORDER);
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
