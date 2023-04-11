import moment from 'moment';
import { Dispatch } from 'react';
import { reverseObject } from 'src/utils/transform/ObjectTransform';
import { StageProperties, getCurrentStage } from '../../../const';

// Handbuild consts
export enum HandbuildStage {
  TODO = 'todo',
  SCULPTED = 'sculpted',
  BISQUED = 'bisqued',
  GLAZED = 'glazed',
  FINISHED = 'finished',
}

export type HandbuildStages = Partial<Record<HandbuildStage, StageProperties>>;

export const HANDBUILD_ORDER: Record<HandbuildStage, number> = {
  [HandbuildStage.TODO]: 0,
  [HandbuildStage.SCULPTED]: 1,
  [HandbuildStage.BISQUED]: 2,
  [HandbuildStage.GLAZED]: 3,
  [HandbuildStage.FINISHED]: 4,
};

export const HANDBUILD_ACTION_LABEL: Record<HandbuildStage, string> = {
  [HandbuildStage.TODO]: 'To Do',
  [HandbuildStage.SCULPTED]: 'Sculpting',
  [HandbuildStage.BISQUED]: 'Bisque Firing',
  [HandbuildStage.GLAZED]: 'Glaze Firing',
  [HandbuildStage.FINISHED]: 'Finished',
};

export const HANDBUILD_FINISHED_LABEL: Record<HandbuildStage, string> = {
  [HandbuildStage.TODO]: 'To Do',
  [HandbuildStage.SCULPTED]: 'Sculpted',
  [HandbuildStage.BISQUED]: 'Bisqued',
  [HandbuildStage.GLAZED]: 'Glazed',
  [HandbuildStage.FINISHED]: 'Finished',
};

export function getDefaultHandbuildStage() {
  return {
    [HandbuildStage.SCULPTED]: {
      date: moment(),
    },
  };
}

export function onHandbuildNextStage(
  stages: HandbuildStages,
  setCurrentStage: Dispatch<HandbuildStages>,
): void {
  const currentStage = getCurrentStage(stages, HANDBUILD_ORDER);
  if (currentStage === HandbuildStage.FINISHED) {
    // Can't go next on FINISHED
  } else {
    const STAGE_ORDER = reverseObject(HANDBUILD_ORDER);
    setCurrentStage({
      ...stages,
      [STAGE_ORDER[HANDBUILD_ORDER[currentStage] + 1]]: {
        ...stages[STAGE_ORDER[HANDBUILD_ORDER[currentStage] + 1]],
        date: moment(),
      },
    });
  }
}

export function onHandbuildPreviousStage(
  stages: HandbuildStages,
  setCurrentStage: Dispatch<HandbuildStages>,
): void {
  const currentStage = getCurrentStage(stages, HANDBUILD_ORDER);
  if (currentStage === HandbuildStage.TODO) {
    // Can't go prev on TODO
  } else if (currentStage === HandbuildStage.SCULPTED) {
    setCurrentStage({
      ...stages,
      [HandbuildStage.SCULPTED]: {
        ...stages[HandbuildStage.SCULPTED],
        date: undefined,
      },
      [HandbuildStage.TODO]: {
        date: stages?.[HandbuildStage.TODO]?.date ?? moment(),
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
