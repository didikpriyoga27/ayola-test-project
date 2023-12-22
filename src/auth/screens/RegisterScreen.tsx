import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {StackParamList} from '../../shared/navigation/types';

const RegisterScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  return (
    <View>
      <Pressable onPress={() => navigate('OtpScreen')}>
        <Text>Go To OTP</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
