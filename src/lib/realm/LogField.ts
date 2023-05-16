import { Realm } from '@realm/react';
import { LogField, LogFieldTypes, LogImageType, LogType, Stages } from './const';
import { LogSchema } from './schema';

export default class LogFieldClass extends Realm.Object<LogFieldTypes> {
  [LogField.LID]?: Realm.BSON.ObjectId;

  [LogField.IMAGES]?: LogImageType[];

  [LogField.TYPE]?: LogType;

  [LogField.NUMBER]?: string;

  [LogField.TITLE]?: string;

  [LogField.STAGE]?: Stages[];

  [LogField.CLAY]?: string[];

  [LogField.UNDERGLAZE]?: string[];

  [LogField.GLAZE]?: string[];

  [LogField.TAGS]?: string[];

  [LogField.WEIGHT]?: number;

  [LogField.HEIGHT]?: number;

  [LogField.LENGTH]?: number;

  [LogField.WIDTH]?: number;

  [LogField.CREATED_AT]?: Date;

  [LogField.UPDATED_AT]?: Date;

  static schema: Realm.ObjectSchema = LogSchema;
}
