import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CommonStyle} from '../../Theme';

export const PrimaryButton = () => {
  return (
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Siguiente</Text>
      </Pressable>
  );
};

// TODO: centrar el div reloaded

const styles = StyleSheet.create({
  primaryButton: CommonStyle.primaryButton,
  primaryButtonText: {...CommonStyle.primaryButtonText, textAlign: 'center'},
});
