import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {StackParamList} from '../../shared/navigation/types';

const OtpScreen = () => {
  const {goBack} = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View>
      <Pressable onPress={() => goBack()}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
};

export default OtpScreen;
