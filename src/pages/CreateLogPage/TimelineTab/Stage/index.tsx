import View from 'src/components/View';
import { StyleSheet } from 'react-native';
import { RADIUS } from 'src/utils/styles';

export function Stage() {
  return (
    <View style={styles.stageContainer}>
      <View style={styles.stageModifyButton}></View>
      <View style={styles.stageFields}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  stageContainer: {
    gap: 50,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  stageModifyButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2, // circle
    backgroundColor: 'red',
  },
  stageFields: {
    backgroundColor: 'red',
    borderRadius: RADIUS,
    minHeight: 50,
    flex: 1,
  },
});
