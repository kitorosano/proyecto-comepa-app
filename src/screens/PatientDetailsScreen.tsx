import React, {ReactElement, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {THEME_COLORS} from '../contants/theme';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  Direccion,
  OrdenServicioPorFecha,
  OrdenesFisioterapeuta,
} from '../contants/models';
import {getWeekDay} from '../utils';
import fetchClient from '../utils/fetchClient';
import {setMessage} from '../redux/appSlice';

const PatientDetailsScreen = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const accessToken = useAppSelector(state => state.accessToken);
  const selectedPaciente = useAppSelector(state => state.selectedPaciente);
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    if (selectedPaciente && accessToken) {
      obtenerPaciente(selectedPaciente, accessToken);
    }
  }, [selectedPaciente, accessToken]);

  const obtenerPaciente = async (
    selectedPacienteId: number,
    _accessToken: string,
  ) => {
    setLoading(true);
    try {
      const {data} = await fetchClient.get(
        `paciente-rest/obtener-paciente?idPaciente=${selectedPacienteId}`,
        {
          headers: {Authorization: 'Bearer ' + _accessToken},
        },
      );

      setPaciente(data);
    } catch (error: any) {
      dispatch(setMessage(error.message));
    } finally {
      setLoading(false);
    }
  };
  if (!selectedPaciente) {
    return <></>;
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenGoogleMaps = (direccion: string) => {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${direccion}`,
    );
  };

  const handleClickDireccion = (direccion: Direccion) => {
    // prompt to open direction with google maps
    const formattedDireccion = `${direccion.calle} ${direccion.numero}, ${direccion.ciudad}, ${direccion.pais}`;
    Alert.alert(
      'Abrir con Google Maps',
      '¿Desea abrir esta direccion con Google Maps?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Abrir',
          onPress: () => handleOpenGoogleMaps(formattedDireccion),
        },
      ],
      {cancelable: false},
    );
  };

  const handleVerCitasPaciente = () => {
    navigation.navigate('Home', {
      screen: 'PatientsStack',
      params: {
        screen: 'PatientOrders',
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        {/* IR HACIA ATRAS */}
        <View style={styles.closeModal}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icons name="arrow-left" size={25} color={THEME_COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.detailsTitle}>Informacion del paciente</Text>
        </View>

        {/* PACIENTE E INFORMACION */}
        <View style={styles.detailsSection}>
          <Icons
            style={styles.detailsIcon}
            name="account-multiple-outline"
            size={25}
            color={THEME_COLORS.gray}
          />
          <Text style={styles.detailsText}>{paciente?.nombreCompleto}</Text>
        </View>

        <View style={styles.detailsSectionWithoutIcon}>
          <Text style={styles.detailsSubText}>CI: {paciente?.cedula}</Text>
        </View>

        {/* HISTORIAL CLINICO */}
        <View style={styles.detailsSection}>
          <Icons
            style={styles.detailsIcon}
            name="file-document-outline"
            size={25}
            color={THEME_COLORS.gray}
          />
          <Text style={styles.detailsSubText}>
            {paciente?.historialClinico ||
              'No existe registro de historial clinico'}
          </Text>
        </View>

        {/* VER CITAS */}
        {/* <View style={styles.detailsSectionWithoutIcon}>
          <TouchableOpacity
            style={styles.launchIcon}
            onPress={handleVerCitasPaciente}>
            <Text style={styles.verCitasText}>Ver citas del paciente </Text>

            <Icons name="launch" size={15} color={THEME_COLORS.tertiary} />
          </TouchableOpacity>
        </View> */}

        {/* DIRECCIONES */}
        <TouchableOpacity
          onPress={() => handleClickDireccion(paciente?.direcciones[0])}
          style={styles.detailsSection}>
          <Icons
            style={styles.detailsIcon}
            name="home-outline"
            size={25}
            color={THEME_COLORS.gray}
          />
          <Text style={styles.detailsText}>
            {paciente?.direcciones[0].calle} {paciente?.direcciones[0].numero}
            {', '}
            {paciente?.direcciones[0].ciudad}
            {', '}
            {paciente?.direcciones[0].pais}
          </Text>
        </TouchableOpacity>

        {paciente?.direcciones.slice(1).map(direccion => (
          <TouchableOpacity
            onPress={() => handleClickDireccion(direccion)}
            key={direccion.idDireccion}
            style={styles.detailsSectionWithoutIcon}>
            <Text style={styles.detailsText}>
              {direccion.calle} {direccion.numero}
              {', '}
              {direccion.ciudad}
              {', '}
              {direccion.pais}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeModal: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  details: {
    padding: 20,
    flex: 1,
  },
  detailsSectionWithoutIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
    marginLeft: 40,
  },
  detailsSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    // alignItems: 'center', // TOFIX
    marginTop: 10,
    marginBottom: 10,
  },
  detailsIcon: {
    marginRight: 15,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME_COLORS.black,
    marginLeft: 10,
  },
  detailsText: {
    fontSize: 16,
    color: THEME_COLORS.black,
  },
  detailsSubText: {
    fontSize: 14,
  },
  pacienteText: {
    color: THEME_COLORS.black,
    fontSize: 20,
  },
  detailsDireccion: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  direcctionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  directionButton: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.black,
    borderRadius: 20,
    width: '100%',
  },
  directionImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 20,
    opacity: 0.5,
  },
  directionButtonText: {
    position: 'absolute',
    color: THEME_COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: THEME_COLORS.black,
  },
  launchIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderColor: THEME_COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  verCitasText: {
    color: THEME_COLORS.tertiary,
    fontSize: 16,
  },
});

export default PatientDetailsScreen;
