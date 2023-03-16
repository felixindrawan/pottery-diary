import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { error } from 'src/utils';

export const useAsyncStorage = <T>(
  key: string,
  initialValue?: T,
): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const [storageValue, setStorageValue] = useState<T>(initialValue);
  const [updated, setUpdated] = useState<Boolean>(false);

  const clearAsyncStorageItem = async () => {
    setStorageValue(null);
    await AsyncStorage.removeItem(key);
  };
  const getAsyncStorageItem = async () => {
    if (typeof window !== 'undefined') {
      let value = initialValue;
      try {
        const storageItem = (await AsyncStorage.getItem(key)) as T;
        if (storageItem !== 'undefined' && storageItem !== null)
          value = JSON.parse(storageItem as string);
      } catch (e) {
        error(`Get AsyncStorage Error: ${e.toString()}`);
      } finally {
        setStorageValue(value);
        setUpdated(true);
      }
    } else setStorageValue(initialValue);
  };
  const setAsyncStorageItem = useCallback(async (newValue: T) => {
    if (typeof window !== 'undefined') {
      try {
        if (newValue !== 'undefined' && newValue !== null) {
          await AsyncStorage.setItem(key, JSON.stringify(newValue ?? null));
        } else {
          clearAsyncStorageItem();
        }
      } catch (e) {
        error(`Set AsyncStorage Error: ${e.toString()}`);
      } finally {
        setUpdated(false);
        getAsyncStorageItem();
      }
    } else {
      return initialValue;
    }
  }, []);

  useEffect(() => {
    getAsyncStorageItem();
  }, [updated]);

  return [storageValue, setAsyncStorageItem, clearAsyncStorageItem];
};
