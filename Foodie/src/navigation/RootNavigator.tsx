import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../components/LandingScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;