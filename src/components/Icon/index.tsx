import { getColor, useTheme } from 'src/hooks/useTheme';
import { Color, COLORS } from 'src/utils/styles';
import { MaterialIcons } from '@expo/vector-icons';

interface IconProps {
  name: any;
  size?: number;
  color?: string;
  focused?: boolean;
}

export function Icon({ name, size = 30, color, focused = false }: IconProps) {
  const { currentTheme, currentPrimaryColor } = useTheme();
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color || focused ? currentPrimaryColor : getColor(currentTheme)}
    />
  );
}
