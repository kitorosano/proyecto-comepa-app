import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {PacienteConDirecciones} from '../contants/models';
import {THEME_COLORS} from '../contants/theme';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../redux/hooks';
import {setSelectedPaciente} from '../redux/appSlice';

type Props = {
  paciente: PacienteConDirecciones;
};

const PacienteItem = ({paciente}: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const itemPressed = useCallback(() => {
    dispatch(setSelectedPaciente(paciente.idPaciente));
    navigation.navigate('Home', {
      screen: 'PatientsStack',
      params: {screen: 'PatientDetails'},
    });
  }, []);

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{paciente.nombreCompleto}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.subtitle}>CI: {paciente.cedula}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: THEME_COLORS.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    width: '100%',
  },
  leftContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 15,
    color: THEME_COLORS.black,
  },
  subtitle: {
    fontSize: 13,
    color: THEME_COLORS.gray,
  },
});

export default PacienteItem;
