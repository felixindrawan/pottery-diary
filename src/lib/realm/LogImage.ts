import { LogImage, LogImageType } from './const';
import { LogImageSchema } from './schema';

export default class LogImageClass extends Realm.Object<LogImageType> {
  [LogImage.ID]?: Realm.BSON.ObjectId;

  [LogImage.SOURCE]?: 'string';

  static schema: Realm.ObjectSchema = LogImageSchema;
}
