import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';
import Swiper from 'react-native-swiper';
import {Recipe, User} from './FoodApiInterfaces/interfaces';
import {Screens} from '../navigation/RootNavigator';
import {useRoute} from '@react-navigation/native';
import {getRecipeById, postRecipeRating} from '../api/ApiRecipes';
import onRecipeShare from './RecipeShare';
import Icon from 'react-native-ico-material-design';
import {getUser, getUserById, postUserFavourite, deleteUserFavourite} from '../api/ApiUser';
import { AirbnbRating } from 'react-native-ratings';
import { ERROR_GET_USER_IN_RECIPE_DETAILS, ERROR_RECIPE_DETAIL_GET, ErrorNavigate, ERROR_FAVOURITES_POST } from './Error/ErrorCodes';
import { WebView } from 'react-native-webview'; //PARA EL VIDEO

// Archivos PNG
const TiempoIcon = require('../../assets/img/Tiempo.png');
const PorcionesIcon = require('../../assets/img/Porciones.png');
const ShareIcon = require('../../assets/img/Share.png');
const StarIcon = require('../../assets/img/Star.png');

const RecipeDetailsScreen = ({navigation}: {navigation: any}) => {
  const [creator_data, setCreatorData] = useState<User>();
  const [activeMenu, setActiveMenu] = useState('Datos');
  const [recipeDetail, setRecipeDetail] = useState<Recipe>();
  const [activeUser, setActiveUser] = useState<User>();
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [favoriteButtonColor, setFavoriteButtonColor] = useState(Theme.colors.SECONDARY_2);
  const [youtubeLink, setYoutubeLink] = useState<string>(); // PARA EL VIDEO

  const route: any = useRoute();

const onAddToFavourite = async (recipeId: string) => {
  try {
    if (!activeUser?.favourites?.includes(recipeId)) {
      await postUserFavourite(recipeId);
      activeUser?.favourites?.push(recipeId);
      setIsFavourite(true);
      setFavoriteButtonColor(Theme.colors.NEUTRAL_3); //
    } else {
      await deleteUserFavourite(recipeId);
      const filteredFavourites = activeUser?.favourites?.filter((fav: string) => fav !== recipeId);
      activeUser!.favourites = filteredFavourites;
      setIsFavourite(false);
      setFavoriteButtonColor(Theme.colors.SECONDARY_2);
    }
  } catch (error) {
    console.error('Error: ', error);
    ErrorNavigate(navigation, ERROR_FAVOURITES_POST);
  }
}

const getRecipeDetail = async (recipeId: string) => {
  try {
    const recipe = await getRecipeById(recipeId);
    //console.log("GET Recipe: OK");
    const itemData: Recipe = recipe;
    setRecipeDetail(itemData);

    //PARA EL VIDEO
    setYoutubeLink(itemData.youtubeLink);

    //Usuario logueado
    const user = await getUser();
    //console.log('GET Logged User: OK');
    const userData: User = user;
    setActiveUser(userData);

    // Verificar si la receta es favorita
    if (activeUser?.favourites?.includes(recipe._id)) {
      setIsFavourite(true);
    }

    // Obtener información del creador de la receta
    try {
    if (itemData.profileId) {
      const user = await getUserById(itemData.profileId);
      //console.log('GET User: OK');
      const creatorData: User = user;
      setCreatorData(creatorData);
    }
  } catch (error) {
    console.error('Error getUserById', error);
    ErrorNavigate(navigation, ERROR_GET_USER_IN_RECIPE_DETAILS)
  }
  } catch (error) {
    console.error('Error al obtener detalle de la receta', error);
    ErrorNavigate(navigation, ERROR_RECIPE_DETAIL_GET)
  }
};

  useEffect(() => {
    getRecipeDetail(route.params?.recipeId);
  }, [route.params?.recipeId]);

  return (
    recipeDetail && (
      <ScrollView style={styles.background}>
        {/* Sección 1 - Titulo e Iconos */}
        <View style={styles.section}>
          <Text style={styles.titleText}>{recipeDetail.title}</Text>
          <Text style={styles.subTitleText}>{recipeDetail.description}</Text>

          {/* Contenedor para Porciones y Tiempo */}
          <View style={styles.infoContainer}>
            {/* Porciones */}
            <View style={styles.iconContainer}>
              <Image source={PorcionesIcon} style={styles.icon} />
              <Text style={styles.infoText}>{recipeDetail.portions}</Text>
            </View>

             {/* Tiempo */}
             <View style={styles.iconContainer}>
              <Image source={TiempoIcon} style={styles.icon} />
              <Text style={styles.infoText}>
                {recipeDetail.preparationTime}
              </Text>
            </View>

            {/* Rating */}
            <View style={styles.iconContainer}>
              <Image source={StarIcon} style={styles.icon} />
              <Text style={styles.infoText}>
                {
                  recipeDetail.rating ? Math.floor(recipeDetail.rating) : 'N/A'
                }
              </Text>
            </View>
          </View>

          {/* Sección 2 - Botones Compartir y Fav */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[styles.roundButton, { backgroundColor: favoriteButtonColor }]}
              onPress={async () => {
                await onAddToFavourite(recipeDetail._id);
              }}
            >
              <Image source={StarIcon} style={(isFavourite) ? styles.isFavouriteIcon : styles.buttonIcon} />
            </TouchableOpacity>
            <TouchableOpacity 
              disabled={recipeDetail.profileId !== activeUser?.profileId} 
              style={styles.roundButton}
              onPress={() => {
                navigation.navigate(Screens.EditRecipe1, {"recipe": {...recipeDetail}});
              }}>
              <Icon
                style={{marginLeft: 'auto', marginRight: 'auto'}}
                name="create-new-pencil-button"
                height={24}
                width={24}
                color={Theme.colors.NEUTRAL_4}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => {
                onRecipeShare(navigation, recipeDetail);
              }}>
              <Image source={ShareIcon} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Carousel Section */}
        <View style={styles.carouselSection}>
          {recipeDetail.images && recipeDetail.images.length > 0 ? (
            <Swiper
              style={styles.swiperContainer}
              showsButtons={true}
              showsPagination={true}
              key={recipeDetail.images.length}
              activeDotColor={Theme.colors.SECONDARY_2}>
              {recipeDetail.images.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image
                    source={{uri: image.url}}
                    style={styles.carouselImage}
                  />
                </View>
              ))}
            </Swiper>
          ) : (
            <Text>No images available</Text>
          )}
        </View>

        {/* Sección 3 - Autor */}
        <View style={styles.authorSection}>
          <View style={styles.authorContainer}>
            <Image
              source={{
                uri:
                  creator_data?.photo ??
                  'https://godelyg3bucket.s3.sa-east-1.amazonaws.com/dish-image-no.jpg',
              }}
              style={styles.authorImage}
            />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>
                {(creator_data?.name ?? '') + ' ' + (creator_data?.familyName ?? '')}
              </Text>
            </View>
          </View>
        </View>

        {/* Sección 4 - Rating */}
        <View style={styles.ratingSection}>
          <AirbnbRating
            count={5} // Número de estrellas
            reviews={['Terrible', 'Malo', 'Normal', 'Bueno', 'Excelente']}
            defaultRating={recipeDetail?.ratings.filter((rating) => rating.userId === activeUser?.profileId)[0]?.rate ?? 3} 
            size={30}
            onFinishRating={async (rating) => {
              await postRecipeRating(recipeDetail._id, {rating: rating});
            }}
          />
        </View>

        {/* Sección 5 - Menú Horizontal */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={[
              styles.menuOption,
              {
                backgroundColor:
                  activeMenu === 'Datos'
                    ? Theme.colors.SECONDARY_2
                    : Theme.colors.NEUTRAL_3,
              },
            ]}
            onPress={() => setActiveMenu('Datos')}>
            <Text
              style={[
                styles.subTitleText,
                {color: activeMenu === 'Datos' ? 'white' : 'white'},
              ]}>
              Datos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuOption,
              {
                backgroundColor:
                  activeMenu === 'Pasos'
                    ? Theme.colors.SECONDARY_2
                    : Theme.colors.NEUTRAL_3,
              },
            ]}
            onPress={() => setActiveMenu('Pasos')}>
            <Text
              style={[
                styles.subTitleText,
                {color: activeMenu === 'Pasos' ? 'white' : 'white'},
              ]}>
              Pasos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuOption,
              {
                backgroundColor:
                  activeMenu === 'Ingredientes'
                    ? Theme.colors.SECONDARY_2
                    : Theme.colors.NEUTRAL_3,
              },
            ]}
            onPress={() => setActiveMenu('Ingredientes')}>
            <Text
              style={[
                styles.subTitleText,
                {color: activeMenu === 'Ingredientes' ? 'white' : 'white'},
              ]}>
              Ingredientes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenido de 'Pasos' */}
        {activeMenu === 'Pasos' && (
          <View style={styles.stepsSection}>
            {recipeDetail?.steps?.map((step, index) => (
              <View key={index} style={[styles.stepBox, {opacity: 0.8}]}>
                <Text style={styles.stepText}>
                  {index + 1}
                  {'.'} {step}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Contenido de 'Datos' */}
        {activeMenu === 'Datos' && (
          <View style={styles.dataSection}>
            <Text style={styles.dataValue}>
              {recipeDetail?.nutritionalProperties?.calories} Calorías
            </Text>
            <Text style={styles.dataValue}>
              {recipeDetail?.nutritionalProperties?.proteins}g Proteínas
            </Text>
            <Text style={styles.dataValue}>
              {recipeDetail?.nutritionalProperties?.totalFat}g Carbohidratos
            </Text>
            <View style={styles.tagsSection}>
              {recipeDetail?.tags?.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tag,
                    {backgroundColor: Theme.colors.SECONDARY_2},
                  ]}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: Theme.fontFamily.REGULAR,
                    }}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Contenido de 'Ingredientes' */}
        {activeMenu === 'Ingredientes' && (
          <View style={styles.ingredientsSection}>
            {recipeDetail?.ingredients?.map((ingredient, index) => (
              <View key={index} style={styles.ingredientBox}>
                <Text style={styles.ingredientText}>
                  {index + 1}
                  {'.'} {ingredient.name}
                </Text>
                <Text style={styles.quantityText}>{ingredient.amount}</Text>
              </View>
            ))}
          </View>
        )}
        {youtubeLink && (
          <View style={styles.videoSection}>
            <Text style={styles.subTitleText}>Video de la receta</Text>
            <WebView
              source={{ uri: youtubeLink }}
              style={styles.videoContainer}
            />
          </View>
        )}

      </ScrollView>
    )
  );
};




const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.PRIMARY_1,
  },
  section: {
    padding: 30,
  },
  titleText: CommonStyle.titleText,
  subTitleText: CommonStyle.subTitleText,
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
  },
  ratingText: {
    fontSize: 16,
    color: 'black',
    fontFamily: Theme.fontFamily.REGULAR,
  },
  buttonSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  roundButton: {
    borderRadius: 50,
    backgroundColor: Theme.colors.SECONDARY_2,
    padding: 15,
    marginVertical: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  isFavouriteIcon: {
    width: 20,
    height: 20,
    tintColor: 'yellow',
  },
  authorSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  authorInfo: {
    marginLeft: 15,
  },
  authorName: {
    fontSize: 18,
    fontFamily: Theme.fontFamily.REGULAR,
    color: 'black',
  },
  ratingSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
  },
  menuSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    padding: 10,
  },
  menuOption: {
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    width: '30%',
    height: 45,
  },
  dataSection: {
    padding: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  dataValue: {
    fontSize: 16,
    color: 'black',
    fontFamily: Theme.fontFamily.REGULAR,
    marginTop: 5,
  },
  tagsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Theme.colors.SECONDARY_2,
    borderRadius: 15,
    padding: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  stepBox: {
    backgroundColor: Theme.colors.NEUTRAL_4,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    opacity: 0.8, // Editable opacity value (between 0 and 1)
  },
  stepText: {
    fontSize: 16,
    color: 'black',
    fontFamily: Theme.fontFamily.REGULAR,
  },
  carouselSection: {
    height: 300, // Adjust the height as needed
  },
  swiperContainer: {
    height: '100%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
  ingredientsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  ingredientBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.NEUTRAL_4,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    opacity: 0.8,
  },
  ingredientText: {
    fontSize: 16,
    color: 'black',
    fontFamily: Theme.fontFamily.REGULAR,
  },
  quantityText: {
    fontSize: 16,
    color: 'black',
    fontFamily: Theme.fontFamily.REGULAR,
  },
 videoSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  videoContainer: {
    height: 200,
    marginTop: 10,
  },
});

export default RecipeDetailsScreen;
