import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CommonStyle, Theme } from '../../Theme';

const Item = ({data}: any) => (
  <View style={styles.listItem}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{width: '42%'}}>
        <Image source={{uri: data.imgUrl}} style={styles.listImage} />
      </View>
      <View style={{width: '58%'}}>
        <Text style={styles.listItemTitle}>{data.title}</Text>
        <Text style={styles.listDescriptionText}>{data.description}</Text>
      </View>
    </View>
  </View>
);

const RecipesFlatList = ({dataList} : any) => {
  return (
    <SafeAreaView style={styles.listContainer}>
      <FlatList
        data={dataList}
        renderItem={itemData => {
          return <Item data={itemData.item} />;
        }}
        keyExtractor={item => String(item.id)}
      />
      <View style={{padding: 16}}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listItem: {
    backgroundColor: Theme.colors.NEUTRAL_4,
    padding: 0,
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  listImage: {
    borderRadius: 10,
    height: 136,
    width: '100%',
  },
  listItemTitle: {
    color: Theme.colors.SECONDARY_1,
    fontFamily: Theme.fontFamily.SEMIBOLD,
    fontSize: Theme.fontSize.LIST_ITEM_TITLE,
    marginLeft: 20,
    marginRight: 'auto',
    paddingTop: 8,
    marginBottom: 16,
  },
  listDescriptionText: {
    color: Theme.colors.NEUTRAL_1,
    fontFamily: Theme.fontFamily.REGULAR,
    fontSize: Theme.fontSize.LIST_ITEM_TEXT,
    marginLeft: 20,
    marginRight: 'auto',
    paddingTop: 0,
  },
});

export default RecipesFlatList;
