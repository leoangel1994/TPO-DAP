import {Theme} from '../../Theme';
import {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import availableTags from './FoodApiInterfaces/filterTags';

const tagColor = (isPressed: boolean) => {
  return isPressed ? Theme.colors.SECONDARY_2 : Theme.colors.NEUTRAL_4;
};

interface ModalFiltrosProps {
  visible: boolean;
  onFiltersChanged: (index: number, value: boolean) => void;
  onRequestClose: CallableFunction;
  initialState: boolean[];
}

const ModalFiltros = (props: ModalFiltrosProps) => {
  const [filtersvegana, setFiltersvegana] = useState(false);
  const [filtersaptaCeliaco, setFiltersaptaCeliaco] = useState(false);
  const [filtersrapidaPreparacion, setFiltersrapidaPreparacion] =
    useState(false);
  const [filtersestimulaSistInmune, setFiltersestimulaSistInmune] =
    useState(false);
  const [filtersvegetariana, setFiltersvegetariana] = useState(false);
  const [filterspromueveFlora, setFilterspromueveFlora] = useState(false);
  const [filtersBajaEnSodio, setFiltersBajaEnSodio] = useState(false);
  const [filtersBajaEnCarbo, setFiltersBajaEnCarbo] = useState(false);
  const [filtersAntiInflamatoria, setFiltersAntiInflamatoria] = useState(false);

  useEffect(() => {
    setFiltersvegana(props.initialState[0]);
    setFiltersaptaCeliaco(props.initialState[1]);
    setFiltersrapidaPreparacion(props.initialState[2]);
    setFiltersestimulaSistInmune(props.initialState[3]);
    setFiltersvegetariana(props.initialState[4]);
    setFilterspromueveFlora(props.initialState[5]);
    setFiltersBajaEnSodio(props.initialState[6]);
    setFiltersBajaEnCarbo(props.initialState[7]);
    setFiltersAntiInflamatoria(props.initialState[8]);
  }, [props.initialState]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.onRequestClose();
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Theme.colors.OPACITY,
        }}
        activeOpacity={1}
        onPressOut={() => {
          props.onRequestClose();
        }}>
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <View style={styles.tagsRow}>
              <Pressable
                onPress={() => {
                  props.onFiltersChanged(0, !filtersvegana);
                  setFiltersvegana(!filtersvegana);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filtersvegana),
                  }}>
                  {availableTags[0]}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.onFiltersChanged(1, !filtersaptaCeliaco);
                  setFiltersaptaCeliaco(!filtersaptaCeliaco);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filtersaptaCeliaco),
                  }}>
                  {availableTags[1]}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.onFiltersChanged(2, !filtersrapidaPreparacion);
                  setFiltersrapidaPreparacion(!filtersrapidaPreparacion);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filtersrapidaPreparacion),
                  }}>
                  {availableTags[2]}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.onFiltersChanged(3, !filtersestimulaSistInmune);
                  setFiltersestimulaSistInmune(!filtersestimulaSistInmune);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filtersestimulaSistInmune),
                  }}>
                  {availableTags[3]}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.onFiltersChanged(4, !filtersvegetariana);
                  setFiltersvegetariana(!filtersvegetariana);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filtersvegetariana),
                  }}>
                  {availableTags[4]}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.onFiltersChanged(5, !filterspromueveFlora);
                  setFilterspromueveFlora(!filterspromueveFlora);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filterspromueveFlora),
                  }}>
                  {availableTags[5]}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.onFiltersChanged(6, !filtersBajaEnSodio);
                  setFiltersBajaEnSodio(!filtersBajaEnSodio);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filtersBajaEnSodio),
                  }}>
                  {availableTags[6]}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.onFiltersChanged(7, !filtersBajaEnCarbo);
                  setFiltersBajaEnCarbo(!filtersBajaEnCarbo);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filtersBajaEnCarbo),
                  }}>
                  {availableTags[7]}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  props.onFiltersChanged(8, !filtersAntiInflamatoria);
                  setFiltersAntiInflamatoria(!filtersAntiInflamatoria);
                }}>
                <Text
                  style={{
                    ...styles.tag,
                    backgroundColor: tagColor(filtersAntiInflamatoria),
                  }}>
                  {availableTags[8]}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default ModalFiltros;
