import * as SecureStore from 'expo-secure-store';
import { Dispatch, SetStateAction, useCallback, useState, useEffect } from 'react';
import { error } from 'src/utils';

export const useSecureStore = <T>(
  key: string,
  initialValue?: T,
): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const [storageValue, setStorageValue] = useState<T>(initialValue);
  const [updated, setUpdated] = useState<Boolean>(false);

  const clearAsyncStorageItem = async () => {
    setStorageValue(null);
    await SecureStore.deleteItemAsync(key);
  };
  const getSecureStoreItem = async () => {
    if (typeof window !== 'undefined') {
      let value = initialValue;
      try {
        const storageItem = (await SecureStore.getItemAsync(key)) as T;
        if (storageItem !== 'undefined' && storageItem !== null)
          value = JSON.parse(storageItem as string);
      } catch (e) {
        error(`Get SecureStore Error: ${e.toString()}`);
      } finally {
        setStorageValue(value);
        setUpdated(true);
      }
    } else setStorageValue(initialValue);
  };
  const setSecureStoreItem = useCallback(async (newValue: T) => {
    if (typeof window !== 'undefined') {
      try {
        if (newValue !== 'undefined' && newValue !== null) {
          await SecureStore.setItemAsync(key, JSON.stringify(newValue ?? null));
        } else {
          clearAsyncStorageItem();
        }
      } catch (e) {
        error(`Set SecureStore Error: ${e.toString()}`);
      } finally {
        setUpdated(false);
        getSecureStoreItem();
      }
    } else {
      return initialValue;
    }
  }, []);

  useEffect(() => {
    getSecureStoreItem();
  }, [updated]);

  return [storageValue, setSecureStoreItem, clearAsyncStorageItem];
};
