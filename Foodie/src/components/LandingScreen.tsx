import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import CarouselCards from './carrousel/CarrouselCard';
import Icon from 'react-native-ico-material-design';

const LandingScreen = () => {
  return (
    <View style={styles.background}>
      <View style={{padding: 30}}>
        <Text style={styles.titleText}>Hola ~Usuario~</Text>
        <Text style={styles.subTitleText}>¿Qué vas a preparar hoy?</Text>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            minWidth: '100%',
            minHeight: 64,
            marginTop: 16,
            marginBottom: 24,
          }}>
          <TextInput
            style={styles.input}
            placeholder="Hoy quiero..."></TextInput>
          <View
            style={{
              width: '20%',
              paddingLeft: 16,
              justifyContent: 'center',
              flex: 2,
            }}>
            <Pressable
              style={{
                backgroundColor: Theme.colors.SECONDARY_2,
                borderRadius: 10,
                justifyContent: 'center',
                alignContent: 'center',
                height: 48,
                width: 48,
              }}>
              <Icon
                style={{marginLeft: 'auto', marginRight: 'auto'}}
                name="filter-results-button"
                height={20}
                width={20}
                color={Theme.colors.NEUTRAL_1}
              />
            </Pressable>
          </View>
        </View>
        <Text style={styles.subTitleText}>Los mejores calificados</Text>
        <CarouselCards />
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
  input: {...CommonStyle.input, width: '80%'},
});

export default LandingScreen;
