import { LogField, LogImage, StageProperties } from './const';

export enum SchemaKey {
  LOG = 'Log',
  LOG_IMAGE = 'LogImage',
  STAGES = 'Stages',
}

export const LogStageSchema: Realm.ObjectSchema = {
  name: SchemaKey.STAGES,
  properties: {
    [StageProperties.NOTES]: 'string?',
    [StageProperties.DATE]: 'date',
    [StageProperties.STAGE]: 'string',
  },
};

export const LogImageSchema: Realm.ObjectSchema = {
  name: SchemaKey.LOG_IMAGE,
  primaryKey: LogImage.ID,
  properties: {
    [LogImage.ID]: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
    [LogImage.SOURCE]: 'string',
  },
};

export const LogSchema: Realm.ObjectSchema = {
  name: SchemaKey.LOG,
  primaryKey: LogField.LID,
  properties: {
    [LogField.LID]: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
    [LogField.IMAGES]: { type: 'list', objectType: `LogImage` },
    [LogField.TITLE]: 'string',
    [LogField.TYPE]: 'string',
    [LogField.STAGE]: { type: 'list', objectType: `Stages` },
    [LogField.CLAY]: { type: 'list', objectType: `string`, optional: true },
    [LogField.UNDERGLAZE]: { type: 'list', objectType: `string`, optional: true },
    [LogField.GLAZE]: { type: 'list', objectType: `string`, optional: true },
    [LogField.TAGS]: { type: 'list', objectType: `string`, optional: true },
    [LogField.WEIGHT]: 'float?',
    [LogField.DIMENSIONS]: 'string?',
    [LogField.HEIGHT]: 'float?',
    [LogField.LENGTH]: 'float?',
    [LogField.WIDTH]: 'float?',
    [LogField.CREATED_AT]: 'date?',
    [LogField.UPDATED_AT]: 'date?',
  },
};
