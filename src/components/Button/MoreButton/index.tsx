import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'src/components/Icon';

interface MoreButtonProps {
  onPress: () => void;
}

export default function MoreButton({ onPress }: MoreButtonProps) {
  return (
    <TouchableOpacity
      style={{
        paddingLeft: 10,
        gap: 5,
        flexDirection: 'row',
      }}
      onPress={onPress}
    >
      <Icon name="more-horiz" />
    </TouchableOpacity>
  );
}
