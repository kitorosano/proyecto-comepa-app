import React, {ReactElement, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import LoginScreen from '../screens/LoginScreen';
import HomeTabsNavigation from './HomeTabsNavigation';
import {useAppSelector} from '../redux/hooks';
import {ToastAndroid} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = (): ReactElement => {
  const loggedUser = useAppSelector(state => state.usuarioLogueado);
  const message = useAppSelector(state => state.message);

  useEffect(() => {
    if (message) {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }, [message]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedUser ? (
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeTabsNavigation}
          />
        ) : (
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
