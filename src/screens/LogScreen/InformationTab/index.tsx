import { StyleSheet } from 'react-native';
import { FieldErrors } from 'react-hook-form';
import { LOG_FIELD_TITLES, LogField, LogFieldTypes } from 'src/screens/LogScreen/const';
import FormField, { FormFieldProps, FormInputType } from 'src/components/FormField';
import Text from 'src/components/Text';
import View from 'src/components/View';

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

interface InformationTabProps extends Partial<FormFieldProps> {
  errors: FieldErrors<LogFieldTypes>;
  setTitle: (newTitle: string) => void;
}

export default function InformationTab({ control, errors, setTitle }: InformationTabProps) {
  return (
    <View style={styles.container}>
      <View style={styles.fieldSmall}>
        <FormField
          control={control}
          name={LogField.NUMBER}
          label={LOG_FIELD_TITLES[LogField.NUMBER]}
          error={errors[LogField.NUMBER]}
          inputType={FormInputType.NUMBER}
          placeholder="#"
        />
      </View>
      <FormField
        control={control}
        name={LogField.TITLE}
        label={LOG_FIELD_TITLES[LogField.TITLE]}
        error={errors[LogField.TITLE]}
        placeholder="Insert title"
        inputProps={{
          onChange: setTitle,
        }}
      />
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
        label={LOG_FIELD_TITLES[LogField.GLAZE]}
        error={errors[LogField.GLAZE]}
        placeholder="Insert glaze(s)"
      />
      {/* TODO: Add measurements #28 */}
      <View>
        <Text>{LOG_FIELD_TITLES[LogField.DIMENSIONS]}</Text>
        <View style={styles.fieldGroup}>
          <View style={styles.fieldSmall}>
            <FormField
              control={control}
              name={LogField.WIDTH}
              error={errors[LogField.WIDTH]}
              inputType={FormInputType.NUMBER}
              placeholder="Width"
            />
          </View>
          <View style={styles.fieldSmall}>
            <FormField
              control={control}
              name={LogField.LENGTH}
              error={errors[LogField.LENGTH]}
              inputType={FormInputType.NUMBER}
              placeholder="Length"
            />
          </View>
          <View style={styles.fieldSmall}>
            <FormField
              control={control}
              name={LogField.HEIGHT}
              error={errors[LogField.HEIGHT]}
              inputType={FormInputType.NUMBER}
              placeholder="Height"
            />
          </View>
        </View>
      </View>
      <View style={styles.fieldSmall}>
        <FormField
          control={control}
          name={LogField.WEIGHT}
          label={LOG_FIELD_TITLES[LogField.WEIGHT]}
          error={errors[LogField.WEIGHT]}
          inputType={FormInputType.NUMBER}
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
