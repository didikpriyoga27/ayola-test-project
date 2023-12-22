import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppNavigation from './shared/navigation/AppNavigation';

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
};

export default AppContainer;
