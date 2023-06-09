import { Dispatch } from 'react';
import { reverseObject } from 'src/utils/transform/ObjectTransform';
import { HandbuildStage, StageProperties, Stages } from 'src/lib/realm/const';
import { getCurrentStage } from '../../../const';

// Handbuild consts
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

export function getDefaultHandbuildStage(): Stages[] {
  return [
    {
      [StageProperties.DATE]: new Date(),
      [StageProperties.STAGE]: HandbuildStage.SCULPTED,
    },
  ] as Stages[];
}

export function onHandbuildNextStage(stages: Stages[], setCurrentStage: Dispatch<Stages[]>): void {
  const currentStage = getCurrentStage(stages, HANDBUILD_ORDER);
  if (currentStage === HandbuildStage.FINISHED) {
    // Can't go next on FINISHED
  } else {
    const STAGE_ORDER = reverseObject(HANDBUILD_ORDER);
    const newStage = STAGE_ORDER[HANDBUILD_ORDER[currentStage] + 1];
    setCurrentStage([
      ...stages.filter((s) => s.stage !== newStage),
      {
        [StageProperties.DATE]: new Date(),
        [StageProperties.STAGE]: STAGE_ORDER[HANDBUILD_ORDER[currentStage] + 1],
      } as Stages,
    ]);
  }
}

export function onHandbuildPreviousStage(
  stages: Stages[],
  setCurrentStage: Dispatch<Stages[]>,
): void {
  const currentStage = getCurrentStage(stages, HANDBUILD_ORDER);
  if (currentStage === HandbuildStage.TODO) {
    // Can't go prev on TODO
  } else if (currentStage === HandbuildStage.SCULPTED) {
    setCurrentStage([
      ...stages.filter(
        (s) => s.stage !== HandbuildStage.SCULPTED && s.stage !== HandbuildStage.TODO,
      ),
      {
        [StageProperties.DATE]: new Date(),
        [StageProperties.STAGE]: HandbuildStage.TODO,
      } as Stages,
    ]);
  } else {
    setCurrentStage(stages.filter((s) => s.stage !== currentStage));
  }
}
