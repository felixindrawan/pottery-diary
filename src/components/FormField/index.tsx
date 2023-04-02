import { StyleSheet } from 'react-native';
import { Controller, UseControllerProps } from 'react-hook-form';
import { Color, COLORS, getHexToAlpha, Size } from 'src/utils/styles';
import Text from 'src/components/Text';
import View from '../View';
import { TextInput } from 'react-native-gesture-handler';
import { getColor, useTheme } from 'src/hooks/useTheme';

export interface FormFieldProps<T> extends UseControllerProps<T> {
  error?: any; // Should be FieldError;
  inputType?: 'text' | 'number' | 'select' | 'dropdown';
  label?: string;
  placeholder?: string;
}
export default function FormField<T>({
  control,
  name,
  label,
  rules = {},
  error,
  inputType,
  placeholder = '',
}: FormFieldProps<T>) {
  const { currentTheme } = useTheme();
  let Input = TextInput;
  let validation = rules;
  switch (inputType) {
    case 'number':
      validation = { ...validation };
      // @ts-ignore
      Input = (props) => <TextInput keyboardType="numeric" {...props} />;
      break;
    case 'text':
    default:
      // Handled by initialization above
      break;
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field: { onChange } }) => (
        <View style={styles.container}>
          {label && (
            <Text>
              {rules?.required && <Text style={{ color: COLORS[Color.RED] }}>* </Text>}
              {label}
            </Text>
          )}
          <Input
            onChange={onChange}
            style={{
              ...styles.input,
              color: getColor(currentTheme),
              borderBottomColor: getColor(currentTheme),
            }}
            placeholder={placeholder}
            placeholderTextColor={getHexToAlpha(getColor(currentTheme), 0.4)}
          />
          {error && (
            <Text size={Size.SM} style={{ color: COLORS[Color.RED] }}>
              {error?.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  input: {
    borderBottomWidth: 1,
  },
});
