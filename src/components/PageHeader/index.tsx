import { ReactNode } from 'react';
import Text from 'src/components/Text';
import { Color, COLORS, Size } from 'src/utils/styles';

interface HeaderTitleProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

export function HeaderTitle({ title, subtitle }: HeaderTitleProps) {
  return (
    <Text size={Size.XL} style={{ fontWeight: 'bold' }}>
      {title}{' '}
      {subtitle && (
        <Text size={Size.LG} style={{ fontWeight: 'bold', color: COLORS[Color.NEUTRAL_50] }}>
          {subtitle}
        </Text>
      )}
    </Text>
  );
}
