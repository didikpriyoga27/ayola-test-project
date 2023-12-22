import React, {useState} from 'react';
import {Field, Form} from 'react-final-form';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Image from '../../shared/components/Image';
import PrimaryButton from '../../shared/components/PrimaryButton';
import TextInput from '../../shared/components/TextInput';
import View from '../../shared/components/View';
import EyeIcon from '../../shared/icons/EyeIcon';
import EyeSlashIcon from '../../shared/icons/EyeSlashIcon';
import useFormRegister from '../hooks/useFormRegister';

const RegisterScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {onSubmit, validate} = useFormRegister();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
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
            <PrimaryButton
              className="mx-4"
              onPress={handleSubmit}
              text="Submit"
            />
          </View>
        );
      }}
    />
  );
};

export default RegisterScreen;
