import { StyleSheet } from 'react-native';
import { FieldErrors } from 'react-hook-form';
import View from 'src/components/View';
import { LOG_FIELD_TITLES, LogField, LogFieldTypes } from 'src/pages/CreateLogPage/const';
import FormField, { FormFieldProps } from 'src/components/FormField';

interface TimelineTabProps extends Partial<FormFieldProps<LogFieldTypes>> {
  errors: FieldErrors<LogFieldTypes>;
}

export function TimelineTab({ control, errors }: TimelineTabProps) {
  return (
    <View style={styles.container}>
      <FormField
        control={control}
        name={LogField.CLAY}
        label={LOG_FIELD_TITLES[LogField.CLAY]}
        error={errors[LogField.CLAY]}
        placeholder="Insert clay(s)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
});
