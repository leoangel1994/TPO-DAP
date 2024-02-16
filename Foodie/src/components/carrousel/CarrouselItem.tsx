import {Key} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Screens} from '../../navigation/RootNavigator';
import {Theme} from '../../../Theme';

export const SLIDER_WIDTH = Dimensions.get('window').width - 60;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({item, index, navigation}: any) => {
  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity
        onPress={() => navigation.navigate(Screens.RecipeDetails)}>
        <Image source={{uri: item.imgUrl}} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.header}>{item.title}</Text>
      <View style={styles.textRow}>
        <Text style={styles.timeText}>{item.preparationTime}</Text>
        <Text style={styles.portionText}>{item.portions} Porciones</Text>
      </View>
      <View style={styles.tagsRow}>
        <Text style={styles.tag}>{item.tags[0]}</Text>
        <Text style={styles.tag}>{item.tags[1]}</Text>
        <Text style={styles.tag}>{item.tags[2]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 136,
  },
  header: {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.SEMIBOLD,
    fontSize: Theme.fontSize.CARD_TITLE,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 8,
    marginBottom: 16,
  },
  timeText: {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.REGULAR,
    fontSize: Theme.fontSize.CARD_SUBTITLE,
    marginLeft: 12,
    width: '33%',
    textAlign: 'left',
    marginRight: 'auto',
    paddingTop: 4,
    marginBottom: 16,
  },
  portionText: {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.REGULAR,
    fontSize: Theme.fontSize.CARD_SUBTITLE,
    marginLeft: 'auto',
    width: '50%',
    textAlign: 'right',
    marginRight: 12,
    paddingTop: 4,
    marginBottom: 16,
  },
  textRow: {
    flexDirection: 'row',
  },
  tagsRow: {
    paddingLeft: 24,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag : {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.REGULAR,
    fontSize: Theme.fontSize.CARD_SUBTITLE,
    padding: 4,
    marginBottom: 4,
    borderRadius: 10,
    backgroundColor: Theme.colors.SECONDARY_2,
    marginRight: 12, 
  },
});

export default CarouselCardItem;
