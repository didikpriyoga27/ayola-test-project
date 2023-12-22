import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import LoginScreen from '../../auth/screens/LoginScreen';
import OtpScreen from '../../auth/screens/OtpScreen';
import RegisterScreen from '../../auth/screens/RegisterScreen';
import HomeScreen from '../../main/screens/HomeScreen';
import InitScreen from '../../main/screens/InitScreen';
import {StackParamList} from './types';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<StackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_left',
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name="InitScreen"
          options={{headerShown: false}}
          component={InitScreen}
        />
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
        <Stack.Screen
          name="LoginScreen"
          options={{title: 'Login'}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          options={{title: 'Home'}}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
