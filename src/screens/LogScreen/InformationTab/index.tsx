import { StyleSheet } from 'react-native';
import { LOG_FIELD_TITLES } from 'src/screens/LogScreen/const';
import FormField, { FormFieldProps } from 'src/components/FormField';
import View from 'src/components/View';
import { DEFAULT_INFORMATION_FIELDS, InformationField } from 'src/lib/realm/const';

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

type InformationTabProps = Partial<FormFieldProps>;

export default function InformationTab({ information, setInformation }: InformationTabProps) {
  return (
    <View style={styles.container}>
      {DEFAULT_INFORMATION_FIELDS.map((field) => (
        <FormField
          name={field[InformationField.NAME]}
          label={LOG_FIELD_TITLES[field[InformationField.NAME]]}
          inputType={field[InformationField.TYPE]}
          placeholder={field?.[InformationField.PLACEHOLDER]}
          value={information?.[field[InformationField.NAME]]}
          data={field?.[InformationField.DATA]}
          onChange={(value) => setInformation(field[InformationField.NAME], value)}
        />
      ))}
    </View>
  );
}
