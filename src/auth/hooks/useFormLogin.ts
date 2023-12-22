import {NavigationProp, useNavigation} from '@react-navigation/native';

import {StackParamList} from '../../shared/navigation/types';

type Values = {username: string; password: string};

const useFormLogin = () => {
  const {reset} = useNavigation<NavigationProp<StackParamList>>();
  const onSubmit = () => {
    reset({
      index: 0,
      routes: [
        {
          name: 'HomeScreen',
        },
      ],
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
