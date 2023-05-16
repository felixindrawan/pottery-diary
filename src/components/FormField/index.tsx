import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { FieldError, Merge, UseControllerProps } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { LogFieldTypes } from 'src/lib/realm/const';
import { getBGColor, getColor, useTheme } from 'src/hooks/useTheme';
import { FONT_SIZES, getHexToAlpha, INPUT_RADIUS, Size } from 'src/utils/styles';
import Text from 'src/components/Text';
import View from 'src/components/View';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    borderWidth: 2,
    borderRadius: INPUT_RADIUS,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 10,
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
  // control,
  name,
  label,
  inputType = FormInputType.TEXT,
  placeholder = '',
  value,
  onChange,
  // rules = {},
  // error,
  // inputProps = {},
  ...otherProps
}: FormFieldProps) {
  const { currentTheme, currentPrimaryColor } = useTheme();
  // let validation = rules;
  const getInputRenderer = useCallback(
    (type: string) => {
      switch (type) {
        case FormInputType.SELECT:
          return (
            <MultiSelect
              value={value}
              labelField="label"
              valueField="value"
              {...otherProps}
              onChange={(e: any) => onChange(e)}
              style={{
                ...styles.input,
                borderColor: currentPrimaryColor,
              }}
              selectedTextStyle={{
                color: getColor(currentTheme),
              }}
              itemContainerStyle={{
                borderRadius: INPUT_RADIUS,
              }}
              placeholder={placeholder}
              placeholderStyle={{
                color: getHexToAlpha(getColor(currentTheme), 0.4),
                fontSize: FONT_SIZES[Size.SM],
              }}
            />
          );
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
              {...otherProps}
              onChange={(e: any) => onChange(e.value)}
              style={{
                ...styles.input,
                borderColor: currentPrimaryColor,
              }}
              selectedTextStyle={{
                color: getColor(currentTheme),
              }}
              itemContainerStyle={{
                borderRadius: INPUT_RADIUS,
              }}
              placeholder={placeholder}
              placeholderStyle={{
                color: getHexToAlpha(getColor(currentTheme), 0.4),
                fontSize: FONT_SIZES[Size.SM],
              }}
            />
          );
        case FormInputType.NUMBER:
          // validation = { ...validation }; // TODO
          return (
            <TextInput
              value={`${value}`}
              onChangeText={(text: string) => onChange(text)}
              keyboardType="numeric"
              style={{
                ...styles.input,
                color: getColor(currentTheme),
                borderColor: currentPrimaryColor,
                backgroundColor: getBGColor(currentTheme),
              }}
              placeholder={placeholder}
              placeholderTextColor={getHexToAlpha(getColor(currentTheme), 0.4)}
              {...otherProps}
            />
          );
        case FormInputType.TEXT:
        default:
          // validation = { ...validation }; // TODO
          return (
            <TextInput
              value={value}
              onChangeText={onChange}
              style={{
                ...styles.input,
                color: getColor(currentTheme),
                borderColor: currentPrimaryColor,
                backgroundColor: getBGColor(currentTheme),
              }}
              placeholder={placeholder}
              placeholderTextColor={getHexToAlpha(getColor(currentTheme), 0.4)}
              {...otherProps}
            />
          );
      }
    },
    [currentPrimaryColor, currentTheme, onChange, otherProps, placeholder, value],
  );

  return (
    <View style={styles.container}>
      {label && <Text>{label}</Text>}
      {getInputRenderer(inputType)}
    </View>
  );
}
