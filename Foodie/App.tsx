import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { ErrorHandler } from './src/components/Error/ErrorHandler';

const App = () => {
  return (
    <ErrorHandler>
      <RootNavigator></RootNavigator>
    </ErrorHandler>
  );
};
export default App;
