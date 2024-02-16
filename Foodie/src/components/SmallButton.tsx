import { Pressable, StyleSheet, Text } from 'react-native';
import { CommonStyle } from '../../Theme';

interface SmallButtonProps {
  text: string;
  onPress: CallableFunction;
}

export const SmallButton = (props: SmallButtonProps) => {
  return (
    <Pressable style={[styles.smallButton, props.style]} onPress={() => props.onPress()}>
      <Text style={styles.primaryButtonText}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  smallButton: {
    ...CommonStyle.primaryButton,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
    width: '80%', // Puedes ajustar este valor según tus necesidades
  },
  primaryButtonText: {
    ...CommonStyle.primaryButtonText,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});