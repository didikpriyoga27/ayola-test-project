import React, {useState} from 'react';
import {Field, Form} from 'react-final-form';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import PrimaryButton from '../../shared/components/PrimaryButton';
import TextInput from '../../shared/components/TextInput';
import View from '../../shared/components/View';
import useFormRegister from '../hooks/useFormRegister';

const RegisterScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {onSubmit, validate} = useFormRegister();

  const [isShowPassword] = useState<boolean>(false);

  return (
    <Form
      {...{onSubmit, validate}}
      render={({handleSubmit}) => {
        return (
          <View
            className="bg-white flex-1"
            style={{paddingBottom: bottom + 16}}>
            <ScrollView className="flex-1 bg-white p-6 space-y-4">
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
                        keyboardType="email-address"
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
