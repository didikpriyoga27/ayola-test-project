import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BaseLayout from '../../shared/components/BaseLayout';
import Text from '../../shared/components/Text';
import View from '../../shared/components/View';
import {StackParamList} from '../../shared/navigation/types';
import useCountdownTimer from '../hooks/useCountdowntimer';

const OtpScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  const {params} = useRoute<RouteProp<StackParamList, 'OtpScreen'>>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [shouldResetTimer, setShouldResetTimer] = useState(false);

  const inputRefs = useRef<TextInput[]>([]);
  const timer = useCountdownTimer(30, shouldResetTimer, setShouldResetTimer);

  const handleInputChange = (index: number, value: string) => {
    if (/^\d+$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }

      const isOtpComplete = newOtp.every(digit => /^\d$/.test(digit));
      if (isOtpComplete) {
        const combinedOtp = newOtp.join('');
        if (combinedOtp === '111111') {
          navigate('LoginScreen');
        } else {
          Alert.alert('Invalid OTP', 'Please input valid OTP');
          newOtp.fill('', 0);
          setOtp(newOtp);
          inputRefs.current[0]?.focus();
        }
      }
    }
  };

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && inputRefs.current[index - 1]) {
      // 1st - 5th digit
      if (!otp[index]) {
        inputRefs.current[index - 1].focus();
        // last digit
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        inputRefs.current[index].focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    const newOtp = [...otp];
    newOtp.fill('', index);
    setOtp(newOtp);
  };

  const handleResendCode = () => {
    setShouldResetTimer(true);
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  return (
    <BaseLayout>
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1">
          <View className="space-y-2 p-4">
            <Text className="text-2xl font-semibold text-center">
              {'Enter Authentication Code'}
            </Text>
            <Text className="text-base text-center">
              {`Enter the 6-digit that we have sent via the phone number to +62 ${params.phone.replace(
                /\B(?=(\d{4})+(?!\d))/g,
                '-',
              )}`}
            </Text>
          </View>
          <View className="flex-1 flex-row justify-evenly">
            {otp.map((value, index) => (
              <TextInput
                key={index.toString()}
                //@ts-ignore
                ref={ref => (inputRefs.current[index] = ref)}
                className={`w-10 h-10 rounded-full text-2xl border font-semibold pb-1 ${
                  value ? 'border-2 border-red-500' : 'border-gray-400'
                }`}
                value={value}
                onChangeText={text => handleInputChange(index, text)}
                onKeyPress={event => handleKeyPress(index, event)}
                onFocus={() => handleFocus(index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>
        </ScrollView>
        <View className="p-4 items-center" style={{paddingBottom: bottom + 24}}>
          {!!timer && (
            <Text className="text-base">
              (
              {`${Math.floor(timer / 60)
                .toString()
                .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}
              )
            </Text>
          )}

          <Pressable onPress={handleResendCode} disabled={timer !== 0}>
            <Text
              className={`text-base font-semibold ${
                !timer ? 'text-red-500' : 'text-gray-400'
              }`}>
              Resend Code
            </Text>
          </Pressable>
        </View>
      </View>
    </BaseLayout>
  );
};

export default OtpScreen;
