import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'src/components/Icon';

interface SaveButtonProps {
  onPress: () => void;
}

export default function SaveButton({ onPress }: SaveButtonProps) {
  return (
    <TouchableOpacity
      style={{
        paddingLeft: 10,
        gap: 5,
        flexDirection: 'row',
      }}
      onPress={onPress}
    >
      <Icon name="save" />
    </TouchableOpacity>
  );
}
