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
  [LogField.INDEX]: 'Index',
  [LogField.TITLE]: 'Title',
  [LogField.STAGE]: 'Stage',
  [LogField.CLAY]: 'Clay',
  [LogField.UNDERGLAZE]: 'Underglaze',
  [LogField.GLAZE]: 'Glaze',
  // TODO TAGS [LogField.TAGS]: 'Tags',
  [LogField.WEIGHT]: 'Weight',
  [LogField.HEIGHT]: 'Height',
  [LogField.LENGTH]: 'Length',
  [LogField.WIDTH]: 'Width',
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
