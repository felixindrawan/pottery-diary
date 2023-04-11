import View from 'src/components/View';
import { StyleSheet } from 'react-native';
import { Color, COLORS, getHexToAlpha, RADIUS, Size } from 'src/utils/styles';
import { Icon } from 'src/components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from 'src/components/Text';
import { useTheme } from 'src/hooks/useTheme';
import moment from 'moment';
import { formatMMDDYY } from 'src/utils/transform/DateTimeTransform';
import { StageProperties } from '../../../const';
import { HANDBUILD_FINISHED_LABEL, HandbuildStage } from './const';

const styles = StyleSheet.create({
  stageContainer: {
    gap: 25,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 24 / 2, // circle
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2, // circle
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    borderRadius: RADIUS,
    minHeight: 50,
    flex: 1,
  },
  fieldButton: { minHeight: 50 },
  fieldTitle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  fieldDesc: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

interface StageProps {
  stage: HandbuildStage;
  stageProps: StageProperties;
  onNextStage: () => void;
  onPreviousStage: () => void;
  current: boolean;
}

export default function Stage({
  stage,
  stageProps,
  onNextStage,
  onPreviousStage,
  current = false,
}: StageProps) {
  const { currentPrimaryColor } = useTheme();
  return (
    <View style={styles.stageContainer}>
      <View
        style={{
          ...styles.buttonContainer,
          backgroundColor: current ? currentPrimaryColor : 'transparent',
        }}
      >
        {current ? (
          <>
            <TouchableOpacity
              onPress={onNextStage}
              style={{
                ...styles.button,
                borderTopLeftRadius: 24 / 2,
                borderTopRightRadius: 24 / 2,
                backgroundColor: currentPrimaryColor,
              }}
            >
              <Icon name="keyboard-arrow-up" size={24} color={COLORS[Color.NEUTRAL_10]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPreviousStage}
              style={{
                ...styles.button,
                borderBottomLeftRadius: 24 / 2,
                borderBottomRightRadius: 24 / 2,
                backgroundColor: currentPrimaryColor,
              }}
            >
              <Icon name="keyboard-arrow-down" size={24} color={COLORS[Color.NEUTRAL_10]} />
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              ...styles.circle,
              backgroundColor: current
                ? currentPrimaryColor
                : getHexToAlpha(currentPrimaryColor, 0.6),
            }}
          />
        )}
      </View>
      <View
        style={{
          ...styles.fieldContainer,
          backgroundColor: current ? currentPrimaryColor : getHexToAlpha(currentPrimaryColor, 0.6),
        }}
      >
        <TouchableOpacity style={styles.fieldButton}>
          <View style={styles.fieldTitle}>
            <Text size={Size.LG} style={{ color: COLORS[Color.NEUTRAL_10] }}>
              {HANDBUILD_FINISHED_LABEL[stage]}
            </Text>
            <Text size={Size.LG} style={{ color: COLORS[Color.NEUTRAL_10] }}>
              {formatMMDDYY(stageProps?.date || moment())}
            </Text>
          </View>
          {stageProps?.notes && (
            <View style={styles.fieldDesc}>
              <Text style={{ color: COLORS[Color.NEUTRAL_10] }}>{stageProps.notes}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
