import { Moment } from 'moment';
import { LogImage } from 'src/components/ImagePicker';
import { ThrownStages } from './TimelineTab/Profiles/Thrown/const';
import { HandbuildStages } from './TimelineTab/Profiles/Handbuild/const';

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
  [LogType.THROW]: 'Wheel Thrown',
  [LogType.HANDBUILD]: 'Handbuild',
};

export enum LogField {
  LID = 'lid', // Log ID
  IMAGES = 'images',
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
  [LogField.LID]: string;
  [LogField.IMAGES]: LogImage[];
  [LogField.TYPE]: LogType;
  [LogField.NUMBER]?: string;
  [LogField.TITLE]?: string;
  [LogField.STAGE]: ThrownStages | HandbuildStages; // TODO: Stage Profile
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
};

export interface StageProperties {
  notes?: string;
  date?: Moment;
}

export type Stages = ThrownStages | HandbuildStages;

// Sort stages by ORDER
export function sortStages<K extends string>(
  stages: Partial<Record<K, StageProperties>>,
  ORDER: Record<K, number>,
): K[] {
  // TODO: Stage Profile
  return Object.keys(stages)
    .sort((a, b) => (ORDER?.[b as K] ?? Infinity) - (ORDER?.[a as K] ?? Infinity))
    .filter((stage) => !!stages[stage as K]?.date) as K[];
}

// Sort order of stages and get the latest with date
export function getCurrentStage<K extends string>(
  stages: Partial<Record<K, StageProperties>>,
  ORDER: Record<K, number>,
): K {
  return sortStages(stages, ORDER)[0] as K;
}
