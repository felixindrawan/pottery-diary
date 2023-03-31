import { StyleSheet } from 'react-native';
import { FieldErrors, useForm } from 'react-hook-form';
import View from 'src/components/View';
import MaterialTopTab from 'src/components/Navigation/MaterialTopTab';
import {
  LOG_FIELD_TITLES,
  LogField,
  LogFieldTypes,
  LogTab,
  LOG_TAB_TITLES,
  ThrownStage,
} from 'src/pages/CreateLogPage/const';
import FormField, { FormFieldProps } from 'src/components/FormField';
import { useCallback } from 'react';
import Text from 'src/components/Text';

export default function CreateLogStack() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogFieldTypes>({
    // TODO: Change default values for stage based on type
    defaultValues: { [LogField.TITLE]: 'Untitled', [LogField.STAGE]: ThrownStage.THROWN },
  });
  const Information = useCallback(() => <InformationTab control={control} errors={errors} />, []);

  const LOG_TABS = [
    {
      name: LogTab.TIMELINE,
      component: Information,
    },
    {
      name: LogTab.INFORMATION,
      component: Information,
    },
  ];

  return <MaterialTopTab TABS={LOG_TABS} LABELS={LOG_TAB_TITLES} />;
}

interface InformationTabProps extends Partial<FormFieldProps<LogFieldTypes>> {
  errors: FieldErrors<LogFieldTypes>;
}

function InformationTab({ control, errors }: InformationTabProps) {
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
      <Text style={styles.fieldLabel}>Dimensions</Text>
      <View style={styles.dimensions}>
        <View style={styles.dimensionFields}>
          <FormField
            control={control}
            name={LogField.WIDTH}
            error={errors[LogField.WIDTH]}
            inputType="number"
            placeholder="Width"
          />
        </View>
        <View style={styles.dimensionFields}>
          <FormField
            control={control}
            name={LogField.LENGTH}
            error={errors[LogField.LENGTH]}
            inputType="number"
            placeholder="Length"
          />
        </View>
        <View style={styles.dimensionFields}>
          <FormField
            control={control}
            name={LogField.HEIGHT}
            error={errors[LogField.HEIGHT]}
            inputType="number"
            placeholder="Height"
          />
        </View>
      </View>
      <View style={styles.dimensionFields}>
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
  dimensions: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  dimensionFields: {
    width: '33%',
  },
});
