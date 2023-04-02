import { getColor, useTheme } from 'src/hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';

interface IconProps {
  name: any; // TODO: Set as any bc of MaterialIcons name
  size?: number;
  color?: string;
  isActive?: boolean;
}

export function Icon({ name, size = 30, color, isActive = false }: IconProps) {
  const { currentTheme, currentPrimaryColor } = useTheme();
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={!!color ? color : isActive ? currentPrimaryColor : getColor(currentTheme)}
    />
  );
}
