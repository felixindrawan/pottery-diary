import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LogFieldTypes } from 'src/screens/LogScreen/const';

interface LogContextProps {
  logs?: LogFieldTypes[];
  createLog?: (newLog: LogFieldTypes) => void;
}

const LogContext = createContext<LogContextProps>({});

export function LogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogFieldTypes[]>([]);
  const createLog = useCallback((newLog: LogFieldTypes) => setLogs([...logs, newLog]), [logs]);

  const context = useMemo(
    () => ({
      logs,
      createLog,
    }),
    [logs, createLog],
  );
  return <LogContext.Provider value={context}>{children}</LogContext.Provider>;
}

export function useLog() {
  return useContext(LogContext);
}
