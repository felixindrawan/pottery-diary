import { Icon } from 'src/components/Icon';
import View from 'src/components/View';

export default function SearchAndFilter() {
  return (
    <View
      style={{
        paddingLeft: 10,
        gap: 5,
        flexDirection: 'row',
      }}
    >
      <Icon name="search" />
      <Icon name="filter-alt" />
    </View>
  );
}
