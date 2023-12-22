import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import db from '../../shared/database';
import {StackParamList} from '../../shared/navigation/types';

type Values = {username: string; password: string};

const useFormLogin = () => {
  const {reset} = useNavigation<NavigationProp<StackParamList>>();

  const onSubmit = (values: Values) => {
    const {username, password} = values;
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (_, results) => {
          const rows = results.rows;

          if (rows.length) {
            const user = rows.item(0);
            if (user.password === password) {
              AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
                reset({
                  index: 0,
                  routes: [
                    {
                      name: 'HomeScreen',
                    },
                  ],
                });
              });
            } else {
              Alert.alert('Incorrect password');
            }
          } else {
            Alert.alert('User not found');
          }
        },
        error => {
          Alert.alert('Error querying users:', String(error));
        },
      );
    });
  };

  const validate = (values: Values) => {
    const errors: any = {};

    // Username validation
    if (!values.username) {
      errors.username = 'Username is required';
    }

    // Password validation
    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return {onSubmit, validate};
};

export default useFormLogin;
