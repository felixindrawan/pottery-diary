import { StyleSheet } from 'react-native';
import { LOG_FIELD_TITLES } from 'src/screens/LogScreen/const';
import FormField, { FormFieldProps } from 'src/components/FormField';
import View from 'src/components/View';
import { DEFAULT_INFORMATION_FIELDS, InformationField, LogFieldTypes } from 'src/lib/realm/const';
import { FieldError, FieldErrors } from 'react-hook-form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 50,
    rowGap: 15,
  },

  fieldGroup: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fieldSmall: {
    width: '28%',
  },
});

interface InformationTabProps extends Partial<FormFieldProps>, Partial<FormFieldProps> {
  errors: FieldErrors<LogFieldTypes>;
}

export default function InformationTab({ control, errors }: InformationTabProps) {
  return (
    <View style={styles.container}>
      {DEFAULT_INFORMATION_FIELDS.map((field) => (
        <FormField
          key={field[InformationField.NAME]}
          control={control}
          error={errors?.[field[InformationField.NAME]] as FieldError}
          name={field[InformationField.NAME]}
          label={LOG_FIELD_TITLES[field[InformationField.NAME]]}
          inputType={field[InformationField.TYPE]}
          placeholder={field?.[InformationField.PLACEHOLDER]}
          data={field?.[InformationField.DATA] ?? []}
        />
      ))}
    </View>
  );
}
