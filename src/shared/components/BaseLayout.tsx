import React, {FC, PropsWithChildren} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import View from './View';

const BaseLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <View className="flex-1">
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
