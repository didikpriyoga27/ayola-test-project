import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {UserType} from '../../auth/types';
import BaseLayout from '../../shared/components/BaseLayout';
import OutlinedButton from '../../shared/components/OutlinedButton';
import Text from '../../shared/components/Text';
import View from '../../shared/components/View';
import {StackParamList} from '../../shared/navigation/types';

const HomeScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {reset} = useNavigation<NavigationProp<StackParamList>>();

  const [user, setUser] = useState<UserType | null>(null);

  const handleLogout = useCallback(() => {
    AsyncStorage.setItem('user', '').then(() => {
      reset({
        index: 0,
        routes: [
          {
            name: 'RegisterScreen',
          },
        ],
      });
    });
  }, [reset]);

  const getUser = useCallback(async () => {
    const res = await AsyncStorage.getItem('user');
    if (res) {
      setUser(JSON.parse(res));
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <BaseLayout>
      <View className="flex-1 bg-white" style={{paddingBottom: bottom + 16}}>
        <ScrollView className="flex-1">
          <View className="p-4 space-y-2">
            <Text className="text-2xl mb-4">Welcome, @{user?.username}</Text>
            <Text className="text-base">Full Name: {user?.name}</Text>
            <Text className="text-base">Email: {user?.email}</Text>
            <Text className="text-base">Phone +62{user?.phone}</Text>
          </View>
        </ScrollView>
        <OutlinedButton onPress={handleLogout} text="Logout" className="mx-4" />
      </View>
    </BaseLayout>
  );
};

export default HomeScreen;
