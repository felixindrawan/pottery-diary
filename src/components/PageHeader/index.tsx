import { ReactNode } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from 'src/components/Text';
import { Color, COLORS, Size } from 'src/utils/styles';
import { Icon } from '../Icon';
import View from '../View';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
});

export interface HeaderTitleProps {
  onBack?: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  extra?: ReactNode;
}

export function HeaderTitle({ onBack, title, subtitle, extra }: HeaderTitleProps) {
  return (
    <View style={{ ...styles.container, marginTop: StatusBar.currentHeight }}>
      <View style={styles.title}>
        {!!onBack && (
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
        )}
        {!!(title || subtitle) && (
          <Text size={Size.XL} numberOfLines={1} style={{ fontWeight: 'bold', maxWidth: 250 }}>
            {title}{' '}
            {subtitle && (
              <Text size={Size.LG} style={{ fontWeight: 'bold', color: COLORS[Color.NEUTRAL_50] }}>
                {subtitle}
              </Text>
            )}
          </Text>
        )}
      </View>
      {extra}
    </View>
  );
}
