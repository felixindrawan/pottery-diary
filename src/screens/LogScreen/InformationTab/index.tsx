import { StyleSheet } from 'react-native';
import { CLAY_TITLES, Clay, LOG_FIELD_TITLES } from 'src/screens/LogScreen/const';
import FormField, { FormFieldProps, FormInputType } from 'src/components/FormField';
import Text from 'src/components/Text';
import View from 'src/components/View';
import { LogField } from 'src/lib/realm/const';

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
      <View style={styles.fieldSmall}>
        <FormField
          name={LogField.NUMBER}
          label={LOG_FIELD_TITLES[LogField.NUMBER]}
          inputType={FormInputType.NUMBER}
          placeholder="#"
          value={information?.[LogField.NUMBER]}
          onChange={(value) => setInformation(LogField.NUMBER, value)}
        />
      </View>
      <FormField
        name={LogField.TITLE}
        label={LOG_FIELD_TITLES[LogField.TITLE]}
        placeholder="Insert title"
        value={information?.[LogField.TITLE]}
        onChange={(value) => setInformation(LogField.TITLE, value)}
      />
      <FormField
        name={LogField.CLAY}
        label={LOG_FIELD_TITLES[LogField.CLAY]}
        inputType={FormInputType.SELECT}
        data={Object.values(Clay).map((clay) => ({
          label: CLAY_TITLES[clay],
          value: clay,
        }))}
        placeholder="Insert clay(s)"
        value={information?.[LogField.CLAY]}
        onChange={(value) => setInformation(LogField.CLAY, value)}
      />
      <FormField
        name={LogField.UNDERGLAZE}
        label={LOG_FIELD_TITLES[LogField.UNDERGLAZE]}
        placeholder="Insert underglaze(s)"
        value={information?.[LogField.UNDERGLAZE]}
        onChange={(value) => setInformation(LogField.UNDERGLAZE, value)}
      />
      <FormField
        name={LogField.GLAZE}
        label={LOG_FIELD_TITLES[LogField.GLAZE]}
        placeholder="Insert glaze(s)"
        value={information?.[LogField.GLAZE]}
        onChange={(value) => setInformation(LogField.GLAZE, value)}
      />
      {/* TODO: Add measurements #28 */}
      <View>
        <Text>{LOG_FIELD_TITLES[LogField.DIMENSIONS]}</Text>
        <View style={styles.fieldGroup}>
          <View style={styles.fieldSmall}>
            <FormField
              name={LogField.WIDTH}
              inputType={FormInputType.NUMBER}
              placeholder="Width"
              value={information?.[LogField.WIDTH]}
              onChange={(value) => setInformation(LogField.WIDTH, value)}
            />
          </View>
          <View style={styles.fieldSmall}>
            <FormField
              name={LogField.LENGTH}
              inputType={FormInputType.NUMBER}
              placeholder="Length"
              value={information?.[LogField.LENGTH]}
              onChange={(value) => setInformation(LogField.LENGTH, value)}
            />
          </View>
          <View style={styles.fieldSmall}>
            <FormField
              name={LogField.HEIGHT}
              inputType={FormInputType.NUMBER}
              placeholder="Height"
              value={information?.[LogField.HEIGHT]}
              onChange={(value) => setInformation(LogField.HEIGHT, value)}
            />
          </View>
        </View>
      </View>
      <View style={styles.fieldSmall}>
        <FormField
          name={LogField.WEIGHT}
          label={LOG_FIELD_TITLES[LogField.WEIGHT]}
          inputType={FormInputType.NUMBER}
          placeholder="Weight"
          value={information?.[LogField.WEIGHT]}
          onChange={(value) => setInformation(LogField.WEIGHT, value)}
        />
      </View>
      <FormField
        name={LogField.TAGS}
        label={LOG_FIELD_TITLES[LogField.TAGS]}
        placeholder="Insert tag(s)"
        value={information?.[LogField.TAGS]}
        onChange={(value) => setInformation(LogField.TAGS, value)}
      />
    </View>
  );
}
