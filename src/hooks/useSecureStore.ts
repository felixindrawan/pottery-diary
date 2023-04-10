import * as SecureStore from 'expo-secure-store';
import { Dispatch, SetStateAction, useCallback, useState, useEffect } from 'react';
import { error } from 'src/utils';

const useSecureStore = <T>(
  key: string,
  initialValue?: T,
): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const [storageValue, setStorageValue] = useState<T>(initialValue);
  const [updated, setUpdated] = useState<boolean>(false);

  const clearSecureStoreItem = useCallback(async () => {
    setStorageValue(null);
    await SecureStore.deleteItemAsync(key);
  }, [key]);
  const getSecureStoreItem = useCallback(async () => {
    if (typeof window !== 'undefined') {
      let value = initialValue;
      try {
        const storageItem = (await SecureStore.getItemAsync(key)) as T;
        if (storageItem !== 'undefined' && storageItem !== null)
          value = JSON.parse(storageItem as string);
      } catch (e) {
        error(`Get SecureStore Error: ${e?.toString()}`);
      } finally {
        setStorageValue(value);
        setUpdated(true);
      }
    } else setStorageValue(initialValue);
  }, [initialValue, key]);
  const setSecureStoreItem = useCallback(
    async (newValue: T) => {
      if (typeof window !== 'undefined') {
        try {
          if (newValue !== 'undefined' && newValue !== null) {
            await SecureStore.setItemAsync(key, JSON.stringify(newValue ?? null));
          } else {
            clearSecureStoreItem();
          }
        } catch (e) {
          error(`Set SecureStore Error: ${e?.toString()}`);
        } finally {
          setUpdated(false);
          getSecureStoreItem();
        }
      } else {
        return initialValue;
      }
    },
    [clearSecureStoreItem, getSecureStoreItem, initialValue, key],
  );

  useEffect(() => {
    getSecureStoreItem();
  }, [updated]);

  return [storageValue, setSecureStoreItem, clearSecureStoreItem];
};

export default useSecureStore;
