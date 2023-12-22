import React, {FC, PropsWithChildren} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';

const BaseLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <View>
      <KeyboardAvoidingView
        className={'flex-1'}
        behavior={Platform.select({ios: 'padding', android: 'height'})}
        keyboardVerticalOffset={0}>
        <View className={'flex-1'}>{children}</View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BaseLayout;
