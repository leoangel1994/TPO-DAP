import {StyleSheet, Text, View} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import {PrimaryButton} from '../PrimaryButton';
import {CommonStyle, Theme} from '../../../Theme';
import Icon from 'react-native-ico-material-design';

// Handler para error genérico no atrapado.

const ErrorFallbackComponent = (props: any) => (
  <View style={styles.background}>
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>¡Error 0!</Text>
      <Icon
        style={{marginLeft: 'auto', marginRight: 'auto'}}
        name="warning-sign"
        height={128}
        width={128}
        color={Theme.colors.DANGER}
      />
      <Text style={styles.subTitleText}>Deberá reiniciar la aplicación</Text>
      <View style={{padding: '20%'}}></View>

      <PrimaryButton text="Aceptar" onPress={props.resetError} />
    </View>
  </View>
);

export const ErrorHandler = ({children}: any) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      {children}
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  background: CommonStyle.background,
  mainContainer: {
    ...CommonStyle.mainContainer,
    backgroundColor: Theme.colors.OPACITY,
    height: '100%',
  },
  titleText: {...CommonStyle.titleText, marginBottom: 64},
  subTitleText: {...CommonStyle.subTitleText, textAlign: 'center', padding: 16},
});
