import { StyleSheet } from 'react-native';
import { FieldErrors } from 'react-hook-form';
import View from 'src/components/View';
import { LOG_FIELD_TITLES, LogField, LogFieldTypes } from 'src/pages/CreateLogPage/const';
import FormField, { FormFieldProps } from 'src/components/FormField';
import Text from 'src/components/Text';

interface InformationTabProps extends Partial<FormFieldProps<LogFieldTypes>> {
  errors: FieldErrors<LogFieldTypes>;
}

export function InformationTab({ control, errors }: InformationTabProps) {
  return (
    <View style={styles.container}>
      <FormField
        control={control}
        name={LogField.CLAY}
        label={LOG_FIELD_TITLES[LogField.CLAY]}
        error={errors[LogField.CLAY]}
        placeholder="Insert clay(s)"
      />
      <FormField
        control={control}
        name={LogField.UNDERGLAZE}
        label={LOG_FIELD_TITLES[LogField.UNDERGLAZE]}
        error={errors[LogField.UNDERGLAZE]}
        placeholder="Insert underglaze(s)"
      />
      <FormField
        control={control}
        name={LogField.GLAZE}
        label={LOG_FIELD_TITLES[LogField.UNDERGLAZE]}
        error={errors[LogField.UNDERGLAZE]}
        placeholder="Insert glaze(s)"
      />
      {/* TODO: Add measurements #28 */}
      <Text style={styles.fieldLabel}>{LOG_FIELD_TITLES[LogField.DIMENSIONS]}</Text>
      <View style={styles.fieldGroup}>
        <View style={styles.fieldSmall}>
          <FormField
            control={control}
            name={LogField.WIDTH}
            error={errors[LogField.WIDTH]}
            inputType="number"
            placeholder="Width"
          />
        </View>
        <View style={styles.fieldSmall}>
          <FormField
            control={control}
            name={LogField.LENGTH}
            error={errors[LogField.LENGTH]}
            inputType="number"
            placeholder="Length"
          />
        </View>
        <View style={styles.fieldSmall}>
          <FormField
            control={control}
            name={LogField.HEIGHT}
            error={errors[LogField.HEIGHT]}
            inputType="number"
            placeholder="Height"
          />
        </View>
      </View>
      <View style={styles.fieldSmall}>
        <FormField
          control={control}
          name={LogField.WEIGHT}
          label={LOG_FIELD_TITLES[LogField.WEIGHT]}
          error={errors[LogField.WEIGHT]}
          inputType="number"
          placeholder="Weight"
        />
      </View>
      <FormField
        control={control}
        name={LogField.TAGS}
        label={LOG_FIELD_TITLES[LogField.TAGS]}
        error={errors[LogField.TAGS]}
        placeholder="Insert tag(s)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  fieldLabel: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  fieldGroup: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  fieldSmall: {
    width: '33%',
  },
});
