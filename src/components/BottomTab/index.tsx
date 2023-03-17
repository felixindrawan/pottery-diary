import { ReactNode } from 'react';
import Text from 'src/components/Text';
import { Size } from 'src/utils/styles';
import { TouchableOpacity } from 'react-native/types';

interface PageHeaderProps {
  title: ReactNode;
  icon?: ReactNode;
}

export function BottomTab({ icon, title, ...otherProps }: PageHeaderProps) {
  return (
    <TouchableOpacity accessibilityRole="button" {...otherProps}>
      <Text size={Size.XL} style={{ fontWeight: 'bold' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
