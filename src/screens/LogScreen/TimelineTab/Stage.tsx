import View from 'src/components/View';
import { useCallback, useState } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { Color, COLORS, getHexToAlpha, RADIUS, Size } from 'src/utils/styles';
import Icon from 'src/components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from 'src/components/Text';
import { useTheme } from 'src/hooks/useTheme';
import { formatMMDDYY } from 'src/utils/transform/DateTimeTransform';
import { HandbuildStage, StageProperties, Stages, ThrownStage } from 'src/lib/realm/const';
import { THROWN_FINISHED_LABEL } from './Profiles/Thrown/const';

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

interface StageProps {
  currentStage: Stages;
  onNextStage: () => void;
  onPreviousStage: () => void;
  label: Record<ThrownStage, string> | Record<HandbuildStage, string>;
  current: boolean;
}

export default function Stage({
  currentStage,
  onNextStage,
  onPreviousStage,
  label = THROWN_FINISHED_LABEL,
  current = false,
}: StageProps) {
  const { currentPrimaryColor } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const onToggleModal = useCallback(() => setModalVisible(!modalVisible), [modalVisible]);

  return (
    <View style={styles.stageContainer}>
      {/* Modal TODO */}
      {/* <Modal visible={modalVisible} transparent onRequestClose={onToggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text>Test</Text>
            <TouchableOpacity onPress={onToggleModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      {/* Stage View */}
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
        <TouchableOpacity style={styles.fieldButton} onPress={onToggleModal}>
          <View style={styles.fieldTitle}>
            <Text size={Size.LG} style={{ color: COLORS[Color.NEUTRAL_10] }}>
              {label[currentStage[StageProperties.STAGE]]}
            </Text>
            <Text size={Size.LG} style={{ color: COLORS[Color.NEUTRAL_10] }}>
              {formatMMDDYY(currentStage?.[StageProperties.DATE] || new Date())}
            </Text>
          </View>
          {currentStage?.[StageProperties.NOTES] && (
            <View style={styles.fieldDesc}>
              <Text style={{ color: COLORS[Color.NEUTRAL_10] }}>
                {currentStage?.[StageProperties.NOTES]}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
