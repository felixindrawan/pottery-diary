import { Moment } from 'moment';

export enum LogTab {
  TIMELINE = 'timeline',
  INFORMATION = 'information',
}

export const LOG_TAB_TITLES: Record<LogTab, string> = {
  [LogTab.TIMELINE]: 'Timeline',
  [LogTab.INFORMATION]: 'Information',
};

export enum LogType {
  THROW = 'throw',
  HANDBUILD = 'handbuild',
}

export const LOG_TYPES: Record<LogType, string> = {
  [LogType.THROW]: 'Wheel Throw',
  [LogType.HANDBUILD]: 'Handbuild',
};

export enum LogField {
  TYPE = 'type',
  NUMBER = 'index',
  TITLE = 'title',
  STAGE = 'stage',
  CLAY = 'clay',
  UNDERGLAZE = 'underglaze',
  GLAZE = 'glaze',
  TAGS = 'tags',
  DIMENSIONS = 'dimensions',
  WEIGHT = 'weight',
  HEIGHT = 'height',
  LENGTH = 'length',
  WIDTH = 'width',
}

export type LogFieldTypes = {
  [LogField.TYPE]: LogType;
  [LogField.NUMBER]?: string;
  [LogField.TITLE]?: string;
  [LogField.STAGE]: ThrownStages; // TODO: Stage Profile
  [LogField.CLAY]?: string[];
  [LogField.UNDERGLAZE]?: string[];
  [LogField.GLAZE]?: string[];
  [LogField.TAGS]?: string[];
  [LogField.WEIGHT]?: number;
  [LogField.DIMENSIONS]?: string;
  [LogField.HEIGHT]?: number;
  [LogField.LENGTH]?: number;
  [LogField.WIDTH]?: number;
};

export const LOG_FIELD_TITLES: Record<LogField, string> = {
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
};

export enum ThrownStage {
  TODO = 'todo',
  THROWN = 'thrown',
  TRIMMED = 'trimmed',
  BISQUED = 'bisqued',
  GLAZED = 'glazed',
  FINISHED = 'finished',
}

export interface ThrownStageProperties {
  notes?: string;
  date: Moment;
}

export type ThrownStages = Partial<Record<ThrownStage, ThrownStageProperties>>;

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

// Srot stages by THROWN_ORDER
export function sortStages(stages: ThrownStages): ThrownStage[] {
  // TODO: Stage Profile
  return Object.keys(stages)
    .sort(
      (a: ThrownStage, b: ThrownStage) =>
        (THROWN_ORDER?.[b] ?? Infinity) - (THROWN_ORDER?.[a] ?? Infinity),
    )
    .filter((stage: ThrownStage) => !!stages[stage]?.date) as ThrownStage[];
}

// Sort order of stages and get the latest with date
export function getCurrentStage(stages: ThrownStages): ThrownStage {
  return sortStages(stages)[0] as ThrownStage;
}
