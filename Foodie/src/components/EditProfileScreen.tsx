import {StyleSheet, Text, View} from 'react-native';
import {CommonStyle, Theme} from '../../Theme';

const EditProfileScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>Edit Profile Screen</Text>
        <Text style={styles.subTitleText}>TODO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: CommonStyle.background,
  mainContainer: CommonStyle.mainContainer,
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

export default EditProfileScreen;
