import { useCallback } from 'react';
import { LogField, LogFieldTypes, LogType } from 'src/lib/realm/const';
import { getDefaultThrownStage } from 'src/screens/LogScreen/TimelineTab/Profiles/Thrown/const';
import LogFieldClass from 'src/lib/realm/LogField';
import { Realm } from '@realm/react';
import { SchemaKey } from 'src/lib/realm/schema';
import { RealmLog, useObject, useRealm } from './useRealm';

export const DEFAULT_TITLE = 'Untitled';

const getDefaultLog = () => ({
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
    (newLog: LogFieldClass) =>
      realm.write(() => {
        Object.keys(newLog)
          .filter((k) => k !== LogField.LID)
          .forEach((key) => {
            if (log?.[key] !== newLog?.[key] && !!newLog?.[key]) log[key] = newLog[key];
          });
        log[LogField.UPDATED_AT] = new Date();
      }),
    [log, realm],
  );
  return { log, updateLog };
}

export function createLog() {
  const newLog = getDefaultLog();
  RealmLog.write(() => {
    RealmLog.create(SchemaKey.LOG, newLog);
  });
  return newLog.lid.toHexString();
}

// TODO LOG FORMAT
export function formatLog(log: LogFieldTypes) {
  const formattedLog = {};
}
