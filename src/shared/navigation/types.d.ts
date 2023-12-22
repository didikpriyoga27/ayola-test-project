import {UserType} from '../../auth/types';

export type StackParamList = {
  InitScreen: undefined;
  RegisterScreen: undefined;
  OtpScreen: UserType;
  LoginScreen: undefined;
  HomeScreen: undefined;
};
