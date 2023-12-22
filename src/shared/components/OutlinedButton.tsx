import React, {FC, memo, ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import Text from './Text';

type Props = {
  leftComponent?: ReactNode;
  text: string;
} & TouchableOpacityProps;

const OutlinedButton: FC<Props> = ({text, className, ...props}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center space-x-2 rounded-full border border-red-500 bg-transparent py-4 ${className}`}
      {...props}>
      <Text className="text-base font-semibold">{text}</Text>
    </TouchableOpacity>
  );
};

export default memo(OutlinedButton);
