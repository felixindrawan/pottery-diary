import { Icon } from 'src/components/Icon';
import View from 'src/components/View';

export default function SaveButton() {
  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        gap: 5,
        flexDirection: 'row',
      }}
    >
      <Icon name="save" />
    </View>
  );
}
