import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';

interface PrimaryButtonProps {
  text: string;
  onPress: CallableFunction;
  backgroundColor?: string
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <Pressable
      style={{
        ...styles.primaryButton,
        backgroundColor: props.backgroundColor ?? Theme.colors.SECONDARY_2,
      }}
      onPress={() => props.onPress()}>
      <Text style={styles.primaryButtonText}>{props.text}</Text>
    </Pressable>
  );
};

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
