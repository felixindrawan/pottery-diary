import { Dispatch, useCallback } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ExpoImagePicker from 'expo-image-picker';
import Icon from 'src/components/Icon';
import { useMediaPermissions } from 'src/hooks/useMediaPermissions';
import { useTheme } from 'src/hooks/useTheme';
import { RADIUS } from 'src/utils/styles';
import { LogImage, LogImageType } from 'src/lib/realm/const';
import { Realm } from '@realm/react';

const styles = StyleSheet.create({
  imagePickerContainer: {
    borderRadius: RADIUS,
    borderWidth: 2,
    height: 200,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ImagePickerProps {
  images: LogImageType[];
  setImages: Dispatch<LogImageType[]>;
}

export default function ImagePicker({ images, setImages }: ImagePickerProps) {
  const { currentPrimaryColor } = useTheme();
  const {
    cameraPermissionStatus,
    libraryPermissionStatus,
    verifyLibraryPermission,
    verifyCameraPermission,
  } = useMediaPermissions();

  const onAddImage = useCallback(async () => {
    if (!libraryPermissionStatus) {
      verifyLibraryPermission();
      return;
    }
    if (!cameraPermissionStatus) {
      verifyCameraPermission();
      return;
    }
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [6, 6],
      base64: true,
      quality: 1,
    });
    if (result?.assets?.[0]?.uri) {
      setImages([
        ...images,
        {
          [LogImage.ID]: new Realm.BSON.ObjectId(),
          [LogImage.SOURCE]: result.assets[0].uri as string,
        },
      ]);
    }
  }, [
    cameraPermissionStatus,
    images,
    libraryPermissionStatus,
    setImages,
    verifyCameraPermission,
    verifyLibraryPermission,
  ]);

  return (
    <ScrollView horizontal style={{ height: 200, flexGrow: 0 }}>
      <TouchableOpacity
        style={{
          ...styles.imagePickerContainer,
          borderColor: currentPrimaryColor,
        }}
        onPress={onAddImage}
      >
        <Icon name="photo-camera" color={currentPrimaryColor} size={50} />
      </TouchableOpacity>
      {images.map(({ source, id }) => (
        <Image
          source={{ uri: source }}
          style={{ ...styles.imagePickerContainer, marginLeft: 10 }}
          key={id.toHexString()}
        />
      ))}
    </ScrollView>
  );
}
