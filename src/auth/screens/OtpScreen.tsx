import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';

import BaseLayout from '../../shared/components/BaseLayout';
import Text from '../../shared/components/Text';
import View from '../../shared/components/View';

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (/^\d+$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
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

  return (
    <BaseLayout>
      <View className="flex-1 bg-white">
        <View className="space-y-2 p-4">
          <Text className="text-2xl font-semibold text-center">
            {'Enter Authentication Code'}
          </Text>
          <Text className="text-base text-center">
            {
              'Enter the 6-digit that we have sent via the phone number to +62882-25629-000'
            }
          </Text>
        </View>
        <View className="flex-1 flex-row justify-evenly">
          {otp.map((value, index) => (
            <TextInput
              key={index.toString()}
              //@ts-ignore
              ref={ref => (inputRefs.current[index] = ref)}
              className={`w-10 h-10 rounded-full text-2xl border font-semibold ${
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
      </View>
    </BaseLayout>
  );
};

export default OtpScreen;
