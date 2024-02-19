// ProgressBar.tsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Theme} from '../../Theme';

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar = ({currentStep}: ProgressBarProps) => {
  const totalSteps: number = 4;
  if (currentStep < 1 || currentStep > 4)
    throw new Error('invalid ProgressBar step');
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {[...Array(totalSteps)].map((_, index) => (
          <View key={index} style={styles.progressContainer}>
            <View
              style={[
                styles.progressStep,
                currentStep > index + 1 && styles.completedStepColor,
                currentStep === index + 1 && styles.activeStepColor,
              ]}>
              <Text style={styles.stepText}>{index + 1}</Text>
            </View>
            {index < totalSteps - 1 ? (
              <View
                style={[
                  styles.progressLine,
                  currentStep > index + 1 && styles.completedProgressLineColor,
                ]}
              />
            ) : (
              <></>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStep: {
    borderRadius: 25,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.NEUTRAL_3,
  },
  completedStepColor: {
    backgroundColor: Theme.colors.SECONDARY_2,
  },
  activeStepColor: {
    backgroundColor: Theme.colors.SECONDARY_1,
  },
  stepText: {
    color: 'white',
    fontSize: 16,
  },
  progressLine: {
    flex: 1,
    height: 4,
    maxWidth: 80,
    backgroundColor: Theme.colors.NEUTRAL_3,
  },
  completedProgressLineColor: {
    backgroundColor: Theme.colors.SECONDARY_2,
  },
});

export default ProgressBar;
