import React, {ReactElement} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeTabParamList} from './types';
import ProfileScreen from '../screens/ProfileScreen';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {THEME_COLORS} from '../contants/theme';
import AgendaScreen from '../screens/AgendaScreen';
import PatientsStackNavigation from './PatientsStackNavigation';

const BottomTab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabsNavigation = (): ReactElement => {
  return (
    <BottomTab.Navigator
      initialRouteName="Agenda"
      screenOptions={() => ({
        tabBarActiveTintColor: THEME_COLORS.primary,
        tabBarInactiveTintColor: THEME_COLORS.gray,
      })}>
      <BottomTab.Screen
        name="PatientsStack"
        component={PatientsStackNavigation}
        options={{
          headerShown: false,
          title: 'Pacientes',
          tabBarIcon: ({color, size}) => (
            <Icons name={'account-details-outline'} size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          headerShown: false,
          title: 'Agenda',
          tabBarIcon: ({color, size}) => (
            <Icons name={'calendar-month-outline'} size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Mi perfil',
          tabBarIcon: ({color, size}) => (
            <Icons name={'account-outline'} size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeTabsNavigation;
