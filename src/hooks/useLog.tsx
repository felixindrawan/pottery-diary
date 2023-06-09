import { useCallback } from 'react';
import {
  DEFAULT_INFORMATION_FIELDS,
  InformationField,
  LogField,
  LogFieldTypes,
  LogType,
} from 'src/lib/realm/const';
import { getDefaultThrownStage } from 'src/screens/LogScreen/TimelineTab/Profiles/Thrown/const';
import LogFieldClass from 'src/lib/realm/LogField';
import { Realm } from '@realm/react';
import { FormInputType } from 'src/components/FormField';
import { useObject, useRealm } from './useRealm';

export const DEFAULT_TITLE = 'Untitled';

export function mapRealmQueryToLog(log: LogFieldClass): LogFieldTypes {
  return {
    [LogField.LID]: log[LogField.LID].toHexString(),
    [LogField.IMAGES]: log?.[LogField.IMAGES],
    [LogField.TYPE]: log?.[LogField.TYPE],
    [LogField.INDEX]: log?.[LogField.INDEX],
    [LogField.TITLE]: log?.[LogField.TITLE],
    [LogField.STAGE]: log?.[LogField.STAGE],
    [LogField.CLAY]: log?.[LogField.CLAY],
    [LogField.UNDERGLAZE]: log?.[LogField.UNDERGLAZE],
    [LogField.GLAZE]: log?.[LogField.GLAZE],
    // TODO TAGS :  [LogField.TAGS]: log?.[LogField.TAGS],
    [LogField.WEIGHT]: log?.[LogField.WEIGHT],
    [LogField.HEIGHT]: log?.[LogField.HEIGHT],
    [LogField.LENGTH]: log?.[LogField.LENGTH],
    [LogField.WIDTH]: log?.[LogField.WEIGHT],
    [LogField.CREATED_AT]: log?.[LogField.CREATED_AT],
    [LogField.UPDATED_AT]: log?.[LogField.UPDATED_AT],
  };
}

// TODO LOG FORMAT
export function formatLog(log: LogFieldTypes) {
  DEFAULT_INFORMATION_FIELDS.forEach((field) => {
    if (field[InformationField.TYPE] === FormInputType.NUMBER) {
      log[field[InformationField.NAME]] = Number(log[field[InformationField.NAME]]) ?? 0;
    }
  });
  return log;
}

export const getDefaultLog = () => ({
  [LogField.LID]: new Realm.BSON.ObjectId(),
  [LogField.IMAGES]: [],
  [LogField.TITLE]: DEFAULT_TITLE,
  [LogField.TYPE]: LogType.THROW,
  [LogField.STAGE]: getDefaultThrownStage(),
  [LogField.CREATED_AT]: new Date(),
  [LogField.UPDATED_AT]: new Date(),
});

export function useLog(lid: string) {
  const realm = useRealm();
  const log = useObject(LogFieldClass, new Realm.BSON.ObjectId(lid)) as LogFieldClass &
    Realm.Object<LogFieldClass, never>;
  const updateLog = useCallback(
    (newLog: LogFieldTypes) => {
      realm.write(() => {
        const formattedLog = mapRealmQueryToLog(log);
        Object.keys(formatLog(newLog))
          .filter((k) => k !== LogField.LID)
          .forEach((key) => {
            if (formattedLog?.[key] !== newLog?.[key]) log[key] = newLog[key];
          });
        log[LogField.UPDATED_AT] = new Date();
      });
    },
    [log, realm],
  );
  const deleteLog = useCallback(() => realm.write(() => realm.delete(log)), [log, realm]);
  return { log: mapRealmQueryToLog(log), updateLog, deleteLog };
}
