import { Realm, createRealmContext } from '@realm/react';
import { ReactNode } from 'react';
import LogFieldClass from 'src/lib/realm/LogField';
import LogImageClass from 'src/lib/realm/LogImage';
import { LogStageSchema } from 'src/lib/realm/schema';

const realmConfig: Realm.Configuration = {
  deleteRealmIfMigrationNeeded: true,
  schema: [LogFieldClass, LogImageClass, LogStageSchema],
};

export const RealmLog = new Realm(realmConfig);
export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);

export function WithRealm({ children }: { children: ReactNode }) {
  return <RealmProvider>{children}</RealmProvider>;
}
