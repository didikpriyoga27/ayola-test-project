import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import db from '../../shared/database';
import {StackParamList} from '../../shared/navigation/types';
import {UserType} from '../types';

type Values = UserType;

const useFormRegister = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();

  const onSubmit = (values: Values) => {
    const {name, email, username, password, phone} = values;
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, email, username, password, phone) VALUES (?, ?, ?, ?, ?)',
        [name, email, username, password, phone],
        () => {
          navigate('OtpScreen', values);
        },
        error => {
          Alert.alert('Error', String(error));
        },
      );
    });
  };

  const validate = (values: Values) => {
    const errors: any = {};

    // Name validation
    if (!values.name) {
      errors.name = 'Name is required';
    }

    // Email validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    // Phone number validation
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{11,12}$/.test(values.phone)) {
      errors.phone = 'Phone number must be between 11 and 12 digits';
    }

    // Username validation
    if (!values.username) {
      errors.username = 'Username is required';
    }

    // Password validation
    if (!values.password) {
      errors.password = 'Password is required';
    } else {
      if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }

      if (!/[a-z]/.test(values.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
      }

      if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
      }

      if (!/\W|_/.test(values.password)) {
        errors.password = 'Password must contain at least one symbol';
      }
    }

    return errors;
  };

  return {onSubmit, validate};
};

export default useFormRegister;
