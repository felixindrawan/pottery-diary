import { ReactNode, Fragment } from 'react';
import View from 'src/components/View';
import Text from 'src/components/Text';
import { Size } from 'src/utils/styles';

interface PageHeaderProps {
  onBack?: ReactNode | boolean;
  title: ReactNode;
  subtitle?: ReactNode;
  extra?: ReactNode;
}

export function PageHeader({ onBack, title, subtitle, extra }: PageHeaderProps) {
  return (
    <Fragment>
      <Text size={Size.XL} style={{ fontWeight: 'bold' }}>
        {title}
      </Text>
    </Fragment>
  );
}
