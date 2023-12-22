import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Field, Form} from 'react-final-form';
import {Pressable, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BaseLayout from '../../shared/components/BaseLayout';
import Image from '../../shared/components/Image';
import PrimaryButton from '../../shared/components/PrimaryButton';
import Text from '../../shared/components/Text';
import TextInput from '../../shared/components/TextInput';
import View from '../../shared/components/View';
import EyeIcon from '../../shared/icons/EyeIcon';
import EyeSlashIcon from '../../shared/icons/EyeSlashIcon';
import {StackParamList} from '../../shared/navigation/types';
import useFormRegister from '../hooks/useFormRegister';

const RegisterScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  const {onSubmit, validate} = useFormRegister();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    navigate('LoginScreen');
  };

  return (
    <BaseLayout>
      <Form
        {...{onSubmit, validate}}
        render={({handleSubmit}) => {
          return (
            <View
              className="bg-white flex-1"
              style={{paddingBottom: bottom + 16}}>
              <ScrollView className="flex-1 bg-white p-6 space-y-4">
                <Image
                  source={require('../../shared/images/logo.png')}
                  style={{width: 240, height: 120}}
                  className="self-center"
                  resizeMode="contain"
                />
                <View>
                  <Field name="name">
                    {({input, meta}) => {
                      const {value, onChange} = input;
                      return (
                        <TextInput
                          label="Name"
                          autoCapitalize="words"
                          {...{value, onChange, meta}}
                        />
                      );
                    }}
                  </Field>
                </View>
                <View>
                  <Field name="email">
                    {({input, meta}) => {
                      const {value, onChange} = input;
                      return (
                        <TextInput
                          label="Email"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          {...{value, onChange, meta}}
                        />
                      );
                    }}
                  </Field>
                </View>
                <View>
                  <Field name="phone">
                    {({input, meta}) => {
                      const {value, onChange} = input;
                      return (
                        <TextInput
                          label="Phone Number"
                          keyboardType="number-pad"
                          leftComponent={<Text>+62</Text>}
                          autoCapitalize="none"
                          onChangeText={text => {
                            const numericValue = text.replace(/[^0-9]/g, '');
                            onChange(numericValue);
                          }}
                          {...{value, meta}}
                        />
                      );
                    }}
                  </Field>
                </View>
                <View>
                  <Field name="username">
                    {({input, meta}) => {
                      const {value, onChange} = input;
                      return (
                        <TextInput
                          label="Username"
                          autoCapitalize="none"
                          {...{value, onChange, meta}}
                        />
                      );
                    }}
                  </Field>
                </View>
                <View>
                  <Field name="password">
                    {({input, meta}) => {
                      const {value, onChange} = input;
                      return (
                        <TextInput
                          label="Password"
                          secureTextEntry={!isShowPassword}
                          rightComponent={
                            !isShowPassword ? <EyeIcon /> : <EyeSlashIcon />
                          }
                          rightComponentOnPress={() =>
                            setIsShowPassword(!isShowPassword)
                          }
                          {...{value, onChange, meta}}
                        />
                      );
                    }}
                  </Field>
                </View>
              </ScrollView>
              <View className="mx-4 space-y-4">
                <PrimaryButton onPress={handleSubmit} text="Submit" />
                <Pressable onPress={handleLogin}>
                  <Text className="text-center text-red-500 font-semibold text-base">
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </BaseLayout>
  );
};

export default RegisterScreen;
