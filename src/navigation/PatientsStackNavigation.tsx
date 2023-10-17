import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PatientsScreen from '../screens/PatientsScreen';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';
import PatientOrdersScreen from '../screens/PatientOrdersScreen';

const PatientsStack = createNativeStackNavigator();

const PatientsStackNavigation = () => {
  return (
    <PatientsStack.Navigator initialRouteName="Patients">
      <PatientsStack.Screen
        name="Patients"
        options={{headerShown: false}}
        component={PatientsScreen}
      />
      <PatientsStack.Screen
        name="PatientDetails"
        options={{headerShown: false}}
        component={PatientDetailsScreen}
      />

      <PatientsStack.Screen
        name="PatientOrders"
        options={{headerShown: false}}
        component={PatientOrdersScreen}
      />
    </PatientsStack.Navigator>
  );
};

export default PatientsStackNavigation;
