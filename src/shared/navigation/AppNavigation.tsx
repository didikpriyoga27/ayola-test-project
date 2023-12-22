import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import OtpScreen from '../../auth/screens/OtpScreen';
import RegisterScreen from '../../auth/screens/RegisterScreen';
import {StackParamList} from './types';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<StackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RegisterScreen"
          options={{title: 'Register'}}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="OtpScreen"
          options={{title: 'OTP'}}
          component={OtpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
