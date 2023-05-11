import { Realm } from '@realm/react';

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
  [LogImage.ID]: Realm.BSON.ObjectId;
  [LogImage.SOURCE]: string;
}

export type LogFieldTypes = {
  [LogField.LID]: Realm.BSON.ObjectId;
  [LogField.IMAGES]?: LogImageType[];
  [LogField.TYPE]: LogType;
  [LogField.NUMBER]?: string;
  [LogField.TITLE]?: string;
  [LogField.STAGE]: Stages[];
  [LogField.CLAY]?: string[];
  [LogField.UNDERGLAZE]?: string[];
  [LogField.GLAZE]?: string[];
  [LogField.TAGS]?: string[];
  [LogField.WEIGHT]?: number;
  [LogField.DIMENSIONS]?: string;
  [LogField.HEIGHT]?: number;
  [LogField.LENGTH]?: number;
  [LogField.WIDTH]?: number;
  [LogField.CREATED_AT]?: Date;
  [LogField.UPDATED_AT]?: Date;
};
