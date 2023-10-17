import React, {ReactElement, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME_COLORS} from '../contants/theme';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {cleanAuthenticatedUser, setMessage} from '../redux/appSlice';
import Loading from '../components/Loading';

// Datos del Fisioterapeuta. Cerrar sesion. ? Capaz que moverlo a un compoenente que despliegue un modal?
const ProfileScreen = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const fisioterapeutaLogueado = useAppSelector(
    state => state.fisioterapeutaLogueado,
  );
  const usuarioLogueado = useAppSelector(state => state.usuarioLogueado);

  const handleLogout = () => {
    setLoading(true);
    dispatch(cleanAuthenticatedUser());
    dispatch(setMessage('Se ha cerrado sesion correctamente'));
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>
        {fisioterapeutaLogueado?.codigoRrhh} -{' '}
        {fisioterapeutaLogueado?.nombreCompleto}
      </Text>
      <Text style={styles.pacienteText}>{usuarioLogueado?.nombreCompleto}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesion</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingView}>
          <Loading loading={loading} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: THEME_COLORS.tertiary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: THEME_COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: THEME_COLORS.white,
    opacity: 0.3,
  },
  pacienteText: {
    color: THEME_COLORS.black,
    fontSize: 20,
    textTransform: 'uppercase',
  },
});

export default ProfileScreen;
