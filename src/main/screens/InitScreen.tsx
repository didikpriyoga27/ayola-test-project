import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

import {StackParamList} from '../../shared/navigation/types';

const InitScreen = () => {
  //@ts-ignore
  const {replace} = useNavigation<NavigationProp<StackParamList>>();
  const checkUser = useCallback(async () => {
    const res = await AsyncStorage.getItem('user');
    if (res) {
      replace('HomeScreen');
    } else {
      replace('RegisterScreen');
    }
  }, [replace]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return <ActivityIndicator />;
};

export default InitScreen;
