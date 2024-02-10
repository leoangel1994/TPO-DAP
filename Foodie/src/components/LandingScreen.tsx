import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';

const LandingScreen = () => {
  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={{padding: 30}}>
          <Text style={styles.titleText}>Hola ~Usuario~</Text>
          <Text style={styles.subTitleText}>¿Qué vas a preparar hoy?</Text>
          <View
            style={{
              minWidth: '100%',
              minHeight: 48,
              marginTop: 16,
              marginBottom: 48,
              backgroundColor: Theme.colors.SECONDARY_3,
            }}></View>
          <Text style={styles.subTitleText}>Los mejores calificados</Text>
        </View>
        <View
          style={{
            minWidth: '100%',
            minHeight: 248,
            backgroundColor: Theme.colors.SECONDARY_3,
          }}></View>
      </ScrollView>
      <View style={styles.backgroundTabBar}>
        <Text>yo? soy solo donde iría el footer...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
    flex: 1,
    alignItems: 'flex-start',
  },
  backgroundTabBar: {
    backgroundColor: Theme.colors.SECONDARY_2,
    width: '100%',
    height: 64,
  },
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  buttonPosition: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
  },
});

export default LandingScreen;
