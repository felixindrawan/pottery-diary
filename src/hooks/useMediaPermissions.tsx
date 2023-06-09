import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import {
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { Alert } from 'react-native';

interface MediaContextProps {
  cameraPermissionStatus: boolean;
  verifyCameraPermission: () => Promise<boolean>;
  libraryPermissionStatus: boolean;
  verifyLibraryPermission: () => Promise<boolean>;
}

const MediaContext = createContext<MediaContextProps>({
  cameraPermissionStatus: false,
  verifyCameraPermission: () => Promise.resolve(false),
  libraryPermissionStatus: false,
  verifyLibraryPermission: () => Promise.resolve(false),
});

function MediaPermissionsProvider({ children }: { children: ReactNode }) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] = useMediaLibraryPermissions();

  const verifyCameraPermission = useCallback(async (): Promise<boolean> => {
    let response;
    switch (libraryPermission?.status) {
      case PermissionStatus.UNDETERMINED:
        response = await requestCameraPermission();
        return response.granted;
      case PermissionStatus.DENIED:
        Alert.alert(
          'Insufficient Permissions',
          'Please grant access to camera on Settings to use this feature',
        );
        response = await requestCameraPermission();
        return response.granted;
      case PermissionStatus.GRANTED:
      default:
        return true;
    }
  }, [libraryPermission?.status, requestCameraPermission]);
  const verifyLibraryPermission = useCallback(async (): Promise<boolean> => {
    let response;
    switch (libraryPermission?.status) {
      case PermissionStatus.UNDETERMINED:
        response = await requestLibraryPermission();
        return response.granted;
      case PermissionStatus.DENIED:
        Alert.alert(
          'Insufficient Permissions',
          'Please grant access to media library on Settings to use this feature',
        );
        response = await requestLibraryPermission();
        return response.granted;
      case PermissionStatus.GRANTED:
      default:
        return true;
    }
  }, [libraryPermission?.status, requestLibraryPermission]);

  useEffect(() => {
    if (libraryPermission?.status !== PermissionStatus.GRANTED) {
      verifyLibraryPermission();
    } else if (cameraPermission?.status !== PermissionStatus.GRANTED) {
      verifyCameraPermission();
    }
  }, [
    cameraPermission?.status,
    libraryPermission?.status,
    verifyCameraPermission,
    verifyLibraryPermission,
  ]);

  const context = useMemo(
    () => ({
      cameraPermissionStatus: cameraPermission?.status === PermissionStatus.GRANTED,
      verifyCameraPermission,
      libraryPermissionStatus: libraryPermission?.status === PermissionStatus.GRANTED,
      verifyLibraryPermission,
    }),
    [
      cameraPermission?.status,
      libraryPermission?.status,
      verifyCameraPermission,
      verifyLibraryPermission,
    ],
  );

  return <MediaContext.Provider value={context}>{children}</MediaContext.Provider>;
}

const useMediaPermissions = () => useContext(MediaContext);

export { MediaPermissionsProvider, useMediaPermissions };
