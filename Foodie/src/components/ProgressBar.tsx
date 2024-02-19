// ProgressBar.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {[...Array(totalSteps)].map((_, index) => (
          <View key={index} style={styles.progressContainer}>
            <View
              style={[
                styles.progressStep,
                (currentStep > index + 1 || currentStep === index + 1) && styles.completedStep,
                currentStep === index + 1 && styles.activeStep,
              ]}
            >
              <Text
                style={[
                  styles.stepText,
                  (currentStep > index + 1 || currentStep === index + 1) && styles.activeStepText,
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {index < totalSteps - 1 && <View style={styles.progressLine} />}
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
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#797979',
  },
  completedStep: {
    backgroundColor: '#F37F21',
  },
  activeStep: {
    backgroundColor: '#F37F21',
  },
  activeStepText: {
    color: 'white',
    fontSize: 16,
  },
  stepText: {
    color: 'white',
    fontSize: 16,
  },
  progressLine: {
    flex: 1,
    height: 4,
    maxWidth: 80,
    backgroundColor: '#797979',
  },
});

export default ProgressBar;


