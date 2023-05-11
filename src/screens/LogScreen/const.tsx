import {
  HandbuildStage,
  LogField,
  LogTab,
  LogType,
  StageProperties,
  Stages,
  ThrownStage,
} from 'src/lib/realm/const';

export const LOG_TAB_TITLES: Record<LogTab, string> = {
  [LogTab.TIMELINE]: 'Timeline',
  [LogTab.INFORMATION]: 'Information',
};

export const LOG_TYPES: Record<LogType, string> = {
  [LogType.THROW]: 'Wheel Thrown',
  [LogType.HANDBUILD]: 'Handbuild',
};

export const LOG_FIELD_TITLES: Record<LogField, string> = {
  [LogField.LID]: 'Log ID',
  [LogField.IMAGES]: 'Images',
  [LogField.TYPE]: 'Type',
  [LogField.NUMBER]: 'Number',
  [LogField.TITLE]: 'Title',
  [LogField.STAGE]: 'Stage',
  [LogField.CLAY]: 'Clay',
  [LogField.UNDERGLAZE]: 'Underglaze',
  [LogField.GLAZE]: 'Glaze',
  [LogField.TAGS]: 'Tags',
  [LogField.WEIGHT]: 'Weight',
  [LogField.DIMENSIONS]: 'Dimensions',
  [LogField.HEIGHT]: 'H',
  [LogField.LENGTH]: 'L',
  [LogField.WIDTH]: 'W',
  [LogField.CREATED_AT]: 'Created At',
  [LogField.UPDATED_AT]: 'Updated At',
};

// Sort stages by ORDER
export function sortStages(
  stages: Stages[],
  ORDER: Record<HandbuildStage, number> | Record<ThrownStage, number>,
): Stages[] {
  return Array.from(stages)
    ?.sort((a, b) => (ORDER?.[b.stage] ?? Infinity) - (ORDER?.[a.stage] ?? Infinity))
    ?.filter((stage) => !!stage?.date);
}

// Sort order of stages and get the latest with date
export function getCurrentStage(
  stages: Stages[],
  ORDER: Record<HandbuildStage, number> | Record<ThrownStage, number>,
): Stages[StageProperties.STAGE] {
  return sortStages(stages, ORDER)[0].stage;
}

export enum Clay {
  WHITE = 'white',
  SPECKLED_WHITE = 'speckledWhite',
  BROWN = 'brown',
  SPECKLED_BROWN = 'speckledBrown',
}

export const CLAY_TITLES: Record<Clay, string> = {
  [Clay.WHITE]: 'White',
  [Clay.SPECKLED_WHITE]: 'Speckled White',
  [Clay.BROWN]: 'Brown',
  [Clay.SPECKLED_BROWN]: 'Speckled Brown',
};
