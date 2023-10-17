import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
};

export type PatientsStackParamList = {
  Patients: undefined;
  PatientDetails: undefined;
  PatientOrders: undefined;
};

export type HomeTabParamList = {
  PatientsStack: NavigatorScreenParams<PatientsStackParamList>;
  Agenda: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
