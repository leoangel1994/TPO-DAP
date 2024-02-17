import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import CarouselCards from './carrousel/CarrouselCard';
import Icon from 'react-native-ico-material-design';
import {useState} from 'react';

const tagColor = (isPressed: boolean) => {
  return isPressed ? Theme.colors.SECONDARY_2 : Theme.colors.NEUTRAL_4;
};

const LandingScreen = ({navigation}: {navigation: any}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filtersrapidaPreparacion, setFiltersrapidaPreparacion] =
    useState(false);
  const [filtersvegetariana, setFiltersvegetariana] = useState(false);
  const [filtersvegana, setFiltersvegana] = useState(false);
  const [filtersaptaCeliaco, setFiltersaptaCeliaco] = useState(false);
  const [filtersestimulaSistInmune, setFiltersestimulaSistInmune] =
    useState(false);
  const [filterspromueveFlora, setFilterspromueveFlora] = useState(false);
  const [filtersAntiInflamatoria, setFiltersAntiInflamatoria] = useState(false);
  const [filtersBajaEnSodio, setFiltersBajaEnSodio] = useState(false);
  const [filtersBajaEnCarbo, setFiltersBajaEnCarbo] = useState(false);

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
              onPress={() => setModalVisible(true)}
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
        <CarouselCards navigation={navigation} />
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: Theme.colors.OPACITY,
          }}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalCenteredView}>
            <View style={styles.modalView}>
              <View style={styles.tagsRow}>
                <Pressable
                  onPress={() => {
                    setFiltersrapidaPreparacion(!filtersrapidaPreparacion);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filtersrapidaPreparacion),
                    }}>
                    Rápida preparación
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersvegetariana(!filtersvegetariana);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filtersvegetariana),
                    }}>
                    Vegetarianas
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersvegana(!filtersvegana);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filtersvegana),
                    }}>
                    Veganas
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersaptaCeliaco(!filtersaptaCeliaco);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filtersaptaCeliaco),
                    }}>
                    Aptas celiacos
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersestimulaSistInmune(!filtersestimulaSistInmune);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filtersestimulaSistInmune),
                    }}>
                    Estimula el sistema inmune
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setFilterspromueveFlora(!filterspromueveFlora);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filterspromueveFlora),
                    }}>
                    Promueve la flora intestinal
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersAntiInflamatoria(!filtersAntiInflamatoria);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filtersAntiInflamatoria),
                    }}>
                    Antiinflamatoria
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersBajaEnSodio(!filtersBajaEnSodio);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filtersBajaEnSodio),
                    }}>
                    Baja en sodio
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersBajaEnCarbo(!filtersBajaEnCarbo);
                  }}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: tagColor(filtersBajaEnCarbo),
                    }}>
                    Baja carbohidratos
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalCenteredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 160,
  },
  modalView: {
    margin: 20,
    backgroundColor: Theme.colors.NEUTRAL_5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Theme.colors.SECONDARY_3,
    padding: 8,
    alignItems: 'center',
    shadowColor: Theme.colors.NEUTRAL_1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  tagsRow: {
    paddingLeft: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.REGULAR,
    fontSize: Theme.fontSize.CARD_SUBTITLE,
    padding: 4,
    marginBottom: 4,
    borderRadius: 10,
    marginRight: 12,
  },
});

export default LandingScreen;
