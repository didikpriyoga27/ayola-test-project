import React, {FC, ReactNode} from 'react';
import {FieldMetaState} from 'react-final-form';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

import Text from './Text';
import View from './View';

export type CustomTextInputProps = {
  label: string;
  leftComponent?: ReactNode;
  leftComponentOnPress?: () => void;
  rightComponent?: ReactNode;
  rightComponentOnPress?: () => void;
  rightComponentTestId?: string;
  meta?: FieldMetaState<any>;
};

type Props = CustomTextInputProps & TextInputProps;

const TextInput: FC<Props> = props => {
  const {
    label,
    placeholder,
    leftComponent,
    leftComponentOnPress,
    rightComponent,
    rightComponentOnPress,
    meta,
    ...restProps
  } = props;

  return (
    <View>
      <Text className="mb-1 text-xs text-text-secondary">{label}</Text>
      <View className="flex-row">
        <RNTextInput
          className={`flex-1 rounded border border-gray-200 px-4 py-3 text-sm ${
            restProps.multiline && 'h-20'
          }`}
          style={[
            restProps.multiline && {textAlignVertical: 'top'},
            Boolean(leftComponent) && {paddingLeft: 40},
          ]}
          placeholder={placeholder ?? `Enter ${label}`}
          placeholderTextColor={'#ACAEB8'}
          {...restProps}
        />
        {Boolean(leftComponent) && (
          <TouchableOpacity
            style={styles.leftComponent}
            onPress={leftComponentOnPress}>
            {leftComponent}
          </TouchableOpacity>
        )}
        {Boolean(rightComponent) && (
          <TouchableOpacity
            style={styles.rightComponent}
            onPress={rightComponentOnPress}>
            {rightComponent}
          </TouchableOpacity>
        )}
      </View>
      {meta?.error && meta?.touched && (
        <Text className="mt-1 text-red-500">{meta.error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftComponent: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    padding: 16,
  },
  rightComponent: {
    position: 'absolute',
    alignSelf: 'center',
    right: 0,
    padding: 16,
  },
});

export default TextInput;
