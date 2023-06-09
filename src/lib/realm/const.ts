import { FormInputType } from 'src/components/FormField';

export enum LogField {
  LID = 'lid', // Log ID
  IMAGES = 'images',
  TYPE = 'type',
  INDEX = 'index',
  TITLE = 'title',
  STAGE = 'stage',
  CLAY = 'clay',
  UNDERGLAZE = 'underglaze',
  GLAZE = 'glaze',
  // TODO TAGS TAGS = 'tags',
  WEIGHT = 'weight',
  HEIGHT = 'height',
  LENGTH = 'length',
  WIDTH = 'width',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum LogTab {
  TIMELINE = 'timeline',
  INFORMATION = 'information',
}

export enum LogType {
  THROW = 'throw',
  HANDBUILD = 'handbuild',
}

export enum StageProperties {
  NOTES = 'notes',
  DATE = 'date',
  STAGE = 'stage',
}

export enum ThrownStage {
  TODO = 'todo',
  THROWN = 'thrown',
  TRIMMED = 'trimmed',
  BISQUED = 'bisqued',
  GLAZED = 'glazed',
  FINISHED = 'finished',
}

export enum HandbuildStage {
  TODO = 'todo',
  SCULPTED = 'sculpted',
  BISQUED = 'bisqued',
  GLAZED = 'glazed',
  FINISHED = 'finished',
}

export interface Stages {
  [StageProperties.NOTES]?: string;
  [StageProperties.DATE]?: Date;
  [StageProperties.STAGE]: ThrownStage & HandbuildStage;
}

export enum LogImage {
  ID = 'id',
  SOURCE = 'source',
}

export interface LogImageType {
  [LogImage.ID]: string;
  [LogImage.SOURCE]: string;
}

export type LogFieldTypes = {
  [LogField.LID]: string;
  [LogField.IMAGES]?: LogImageType[];
  [LogField.TYPE]?: LogType;
  [LogField.INDEX]?: string;
  [LogField.TITLE]?: string;
  [LogField.STAGE]?: Stages[];
  [LogField.CLAY]?: string[];
  [LogField.UNDERGLAZE]?: string[];
  [LogField.GLAZE]?: string[];
  // TODO TAGS [LogField.TAGS]?: string[];
  [LogField.WEIGHT]?: number;
  [LogField.HEIGHT]?: number;
  [LogField.LENGTH]?: number;
  [LogField.WIDTH]?: number;
  [LogField.CREATED_AT]?: Date;
  [LogField.UPDATED_AT]?: Date;
};

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

export enum InformationField {
  NAME = 'name',
  TYPE = 'type',
  PLACEHOLDER = 'placeholder',
  DATA = 'data',
}

export const DEFAULT_INFORMATION_FIELDS: {
  [InformationField.NAME]: LogField;
  [InformationField.TYPE]: FormInputType;
  [InformationField.PLACEHOLDER]: string;
  // TODO: unkown (?)
  [InformationField.DATA]?: { label: unknown; value: unknown }[];
}[] = [
  {
    [InformationField.NAME]: LogField.INDEX,
    [InformationField.TYPE]: FormInputType.NUMBER,
    [InformationField.PLACEHOLDER]: '#',
  },
  {
    [InformationField.NAME]: LogField.TITLE,
    [InformationField.TYPE]: FormInputType.TEXT,
    [InformationField.PLACEHOLDER]: 'Insert title',
  },
  {
    [InformationField.NAME]: LogField.CLAY,
    [InformationField.TYPE]: FormInputType.SELECT,
    [InformationField.PLACEHOLDER]: 'Insert clay(s)',
    [InformationField.DATA]: Object.values(Clay).map((clay) => ({
      label: CLAY_TITLES[clay],
      value: clay,
    })),
  },
  {
    [InformationField.NAME]: LogField.UNDERGLAZE,
    [InformationField.TYPE]: FormInputType.SELECT,
    [InformationField.PLACEHOLDER]: 'Insert underglaze(s)',
    [InformationField.DATA]: Object.values(Clay).map((clay) => ({
      label: CLAY_TITLES[clay],
      value: clay,
    })),
  },
  {
    [InformationField.NAME]: LogField.GLAZE,
    [InformationField.TYPE]: FormInputType.SELECT,
    [InformationField.PLACEHOLDER]: 'Insert glaze(s)',
    [InformationField.DATA]: Object.values(Clay).map((clay) => ({
      label: CLAY_TITLES[clay],
      value: clay,
    })),
  },
  {
    [InformationField.NAME]: LogField.WIDTH,
    [InformationField.TYPE]: FormInputType.NUMBER,
    [InformationField.PLACEHOLDER]: 'Insert width',
  },
  {
    [InformationField.NAME]: LogField.LENGTH,
    [InformationField.TYPE]: FormInputType.NUMBER,
    [InformationField.PLACEHOLDER]: 'Insert length',
  },
  {
    [InformationField.NAME]: LogField.HEIGHT,
    [InformationField.TYPE]: FormInputType.NUMBER,
    [InformationField.PLACEHOLDER]: 'Insert height',
  },
  {
    [InformationField.NAME]: LogField.WEIGHT,
    [InformationField.TYPE]: FormInputType.NUMBER,
    [InformationField.PLACEHOLDER]: 'Insert weight',
  },
  // TODO TAGS {
  //   [InformationField.NAME]: LogField.TAGS,
  //   [InformationField.TYPE]: FormInputType.SELECT,
  //   [InformationField.PLACEHOLDER]: 'Insert tag(s)',
  //   [InformationField.DATA]: Object.values(Clay).map((clay) => ({
  //     label: CLAY_TITLES[clay],
  //     value: clay,
  //   })),
  // },
];
