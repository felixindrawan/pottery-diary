import { StyleSheet } from 'react-native';
import { Controller, FieldError, Merge, UseControllerProps } from 'react-hook-form';
import { Color, COLORS, getHexToAlpha, Size } from 'src/utils/styles';
import Text from 'src/components/Text';
import { TextInput } from 'react-native-gesture-handler';
import { getColor, useTheme } from 'src/hooks/useTheme';
import View from 'src/components/View';
import { LogFieldTypes } from 'src/screens/LogScreen/const';
import { Dropdown } from 'react-native-element-dropdown';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    borderBottomWidth: 1,
  },
});

export enum FormInputType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  DROPDOWN = 'dropdown',
}

export interface FormFieldProps extends Omit<UseControllerProps<LogFieldTypes>, 'defaultValue'> {
  error?: Merge<FieldError, (FieldError | undefined)[]>; // Should be FieldError;
  inputType?: FormInputType;
  label?: string;
  placeholder?: string;
  inputProps?: any; // TODO
}
export default function FormField({
  control,
  name,
  label,
  rules = {},
  error,
  inputType = FormInputType.TEXT,
  placeholder = '',
  inputProps = {},
  ...otherProps
}: FormFieldProps) {
  const { currentTheme } = useTheme();
  let validation = rules;
  const getInputRenderer = (type: string, value: any, onChange: (e: any) => void, props: any) => {
    switch (type) {
      case FormInputType.DROPDOWN:
        /**
         * props = {
         *  value - user input value
         *  data - Array of ({label, value})
         *  style, selectedTextStyle, itemContainerStyle
         * }
         */
        return (
          <Dropdown
            value={value}
            labelField="label"
            valueField="value"
            {...props}
            onChange={(e: any) => {
              if (props?.onChange) {
                props.onChange(e.value);
              }
              onChange(e.value);
            }}
          />
        );
      case FormInputType.NUMBER:
        validation = { ...validation }; // TODO
        return (
          <TextInput
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            style={{
              ...styles.input,
              color: getColor(currentTheme),
              borderBottomColor: getColor(currentTheme),
            }}
            placeholder={placeholder}
            placeholderTextColor={getHexToAlpha(getColor(currentTheme), 0.4)}
            {...props}
          />
        );
      case FormInputType.TEXT:
      default:
        validation = { ...validation }; // TODO
        return (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={{
              ...styles.input,
              color: getColor(currentTheme),
              borderBottomColor: getColor(currentTheme),
            }}
            placeholder={placeholder}
            placeholderTextColor={getHexToAlpha(getColor(currentTheme), 0.4)}
            {...props}
          />
        );
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      {...otherProps}
      render={({ field: { onChange, value } }) => {
        return (
          <View style={styles.container}>
            {label && (
              <Text>
                {rules?.required && <Text style={{ color: COLORS[Color.RED] }}>* </Text>}
                {label}
              </Text>
            )}
            {getInputRenderer(inputType, value, onChange, inputProps)}
            {error && (
              <Text size={Size.SM} style={{ color: COLORS[Color.RED] }}>
                {error?.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}
