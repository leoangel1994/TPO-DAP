import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CommonStyle} from '../../Theme';

interface PrimaryButtonProps {
  text: string;
  onPress: CallableFunction;
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <Pressable style={styles.primaryButton} onPress={() => props.onPress()}>
      <Text style={styles.primaryButtonText}>{props.text}</Text>
    </Pressable>
  );
};

// TODO: centrar el div reloaded

const styles = StyleSheet.create({
  primaryButton: {
    ...CommonStyle.primaryButton,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
  },
  primaryButtonText: {
    ...CommonStyle.primaryButtonText,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
