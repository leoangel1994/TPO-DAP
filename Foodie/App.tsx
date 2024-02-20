import SplashScreen from 'react-native-splash-screen';
import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { ErrorHandler } from './src/components/Error/ErrorHandler';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ErrorHandler>
      <RootNavigator />
    </ErrorHandler>
  );
};

export default App;
