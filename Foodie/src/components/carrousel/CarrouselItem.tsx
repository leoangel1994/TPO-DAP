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
import {Recipe} from '../FoodApiInterfaces/interfaces';

export const SLIDER_WIDTH = Dimensions.get('window').width - 60;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

interface CarrouselItemProps {
  item: Recipe;
  index: number;
  navigation: any;
}

const CarouselCardItem = ({item, index, navigation}: CarrouselItemProps) => {
  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Screens.RecipeDetails, {
            recipeId: item._id,
            userId: item.profileId,
          })
        }>
        {item.images && item.images.length > 0 && item.images[0].url ? (
          <Image
            source={{uri: item.images[0].url, scale: 1}}
            style={styles.image}
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.timeText}>
        {item.preparationTime} - {item.portions} Porciones
      </Text>
      <View style={styles.tagsRow}>
        {item.tags.length > 0 ? (
          <Text style={styles.tag}>{item.tags[0]}</Text>
        ) : (
          <></>
        )}
        {item.tags.length > 1 ? (
          <Text style={styles.tag}>{item.tags[1]}</Text>
        ) : (
          <></>
        )}
        {item.tags.length > 2 ? (
          <Text style={styles.tag}>{item.tags[2]}</Text>
        ) : (
          <></>
        )}
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
    height: 200,
  },
  header: {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.SEMIBOLD,
    fontSize: Theme.fontSize.CARD_TITLE,
    marginLeft: 24,
    marginRight: 'auto',
    paddingTop: 8,
    marginBottom: 4,
  },
  timeText: {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.REGULAR,
    fontSize: Theme.fontSize.CARD_SUBTITLE,
    marginLeft: 24,
    width: '100%',
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
    marginRight: 24,
    paddingTop: 4,
    marginBottom: 16,
  },
  textRow: {
    flexDirection: 'row',
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
    backgroundColor: Theme.colors.SECONDARY_2,
    marginRight: 12,
  },
});

export default CarouselCardItem;
