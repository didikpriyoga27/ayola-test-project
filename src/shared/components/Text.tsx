import React, {FC} from 'react';
import {Text as RNText, TextProps} from 'react-native';

const Text: FC<TextProps> = ({className, ...props}) => {
  return <RNText className={`text-sm ${className}`} {...props} />;
};

export default Text;
