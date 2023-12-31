import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {THEME_COLORS} from '../contants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  addDateTimeDuration,
  formatPrettyDate2,
  formatTimeString,
} from '../utils/index';
import fetchClient from '../utils/fetchClient';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setMessage, setSelectedPaciente} from '../redux/appSlice';
import {
  OrdenRealizado,
  OrdenesFisioterapeuta,
  OrderRealizadoValues,
} from '../contants/models';
import {useNavigation} from '@react-navigation/native';
import axiosClient from '../utils/axiosClient';

type Props = {
  item: OrdenesFisioterapeuta | null;
  modalVisible: boolean;
  closeModal: () => void;
  handleRefresh: () => void;
};

const AgendaItemModal = ({
  item,
  modalVisible,
  closeModal,
  handleRefresh,
}: Props) => {
  const token = useAppSelector(state => state.accessToken);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [observacion, setObservacion] = useState<string>();
  const [editEvaluacion, setEditEvaluacion] = useState(false);
  const [realizado, setRealizado] = useState<OrdenRealizado>();

  useEffect(() => {
    if (item) {
      setRealizado(item.realizacion);
      setObservacion(item.evolucion || '');
    }
  }, [item]);

  if (!modalVisible || !item) return <></>;

  const modalDateTime = `${formatPrettyDate2(item.fecha)} • ${formatTimeString(
    item.hora,
  )} - ${addDateTimeDuration(item.hora, item.duracion)}`;

  const direccionAUtilizar = item.direccionReserva || item.direccion;

  const handleOpenGoogleMaps = () => {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${direccionAUtilizar}`,
    );
  };

  const conditionalStyles = StyleSheet.create({
    container: !editEvaluacion
      ? {
          position: 'absolute',
        }
      : {},
    modalView: editEvaluacion
      ? {
          height: '100%',
        }
      : {},
  });

  const handleCloseModal = () => {
    setEditEvaluacion(false);
    closeModal();
  };

  const handleConfirmUpdateRealizacion = async (estado: OrdenRealizado) => {
    Alert.alert(
      'Estado de la orden',
      `¿Desear actualizar el nuevo estado de la orden a ${OrderRealizadoValues[estado]}?\n\nNOTA: Una vez guardado no se podrá volver a PENDIENTE.`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => handleUpdateRealizacion(estado),
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdateRealizacion = async (estado: OrdenRealizado) => {
    setRealizado(estado);

    try {
      const {data: csrftoken} = await fetchClient.get(
        'reserva-rest/obtener-csrf-token',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );

      const payload = {realizacion: estado};

      const {data} = await axiosClient.put(
        `reserva-rest/modificar-orden-de-servicio?idOrdenServicio=${item.idOrdenServicio}`,
        payload,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'X-CSRF-Token': csrftoken,
          },
        },
      );

      dispatch(setMessage(data.mensaje));
      handleRefresh();
    } catch (error: any) {
      console.log(error.message);
      // dispatch(setMessage('Ha ocurrido un error'));
    }
  };

  const handleUpdateEvaluacion = async () => {
    if (!observacion)
      return dispatch(setMessage('Todos los campos son requeridos'));

    // setLoading(true);

    const {data: csrftoken} = await fetchClient.get(
      'reserva-rest/obtener-csrf-token',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );

    const payload = {
      evolucion: observacion,
      realizacion: OrdenRealizado.REALIZADA,
    };
    try {
      const {data} = await axiosClient.put(
        `reserva-rest/modificar-orden-de-servicio?idOrdenServicio=${item.idOrdenServicio}`,
        payload,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'X-CSRF-Token': csrftoken,
          },
        },
      );

      setEditEvaluacion(false);
      dispatch(setMessage(data.mensaje));
      // setRealizado(payload.realizacion);
      handleRefresh();
    } catch (error: any) {
      dispatch(setMessage(error.message));
    } finally {
      // setLoading(false);
    }
  };

  const handleVerPaciente = () => {
    handleCloseModal();
    dispatch(setSelectedPaciente(item.idPaciente));
    navigation.navigate('Home', {
      screen: 'PatientsStack',
      params: {
        screen: 'PatientDetails',
      },
    });
  };

  const styleChipPendiente =
    realizado === OrdenRealizado.PENDIENTE
      ? styles.selectedRealizacionChip
      : styles.realizacionChip;
  const styleChipRealizado =
    realizado === OrdenRealizado.REALIZADA
      ? styles.selectedRealizacionChip
      : styles.realizacionChip;
  const styleChipNoRealizado =
    realizado === OrdenRealizado.NO_REALIZADA
      ? styles.selectedRealizacionChip
      : styles.realizacionChip;
  const styleChipFalto =
    realizado === OrdenRealizado.FALTO
      ? styles.selectedRealizacionChip
      : styles.realizacionChip;

  const styleChipTextPendiente =
    realizado === OrdenRealizado.PENDIENTE
      ? styles.selectedRealizacionChipText
      : styles.realizacionChipText;
  const styleChipTextRealizado =
    realizado === OrdenRealizado.REALIZADA
      ? styles.selectedRealizacionChipText
      : styles.realizacionChipText;
  const styleChipTextNoRealizado =
    realizado === OrdenRealizado.NO_REALIZADA
      ? styles.selectedRealizacionChipText
      : styles.realizacionChipText;
  const styleChipTextFalto =
    realizado === OrdenRealizado.FALTO
      ? styles.selectedRealizacionChipText
      : styles.realizacionChipText;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!modalVisible}
      onRequestClose={handleCloseModal}>
      <View style={[styles.container, conditionalStyles.container]}>
        <ScrollView
          contentContainerStyle={[
            styles.modalView,
            conditionalStyles.modalView,
          ]}>
          <View style={styles.modalBody}>
            {/* CERRAR MODAL */}
            <View style={styles.closeModal}>
              <View style={styles.realizacionChips}>
                <TouchableOpacity
                  onPress={() =>
                    handleConfirmUpdateRealizacion(OrdenRealizado.PENDIENTE)
                  }
                  style={styleChipPendiente}>
                  <Text style={styleChipTextPendiente}>Pendiente</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleConfirmUpdateRealizacion(OrdenRealizado.REALIZADA)
                  }
                  style={styleChipRealizado}>
                  <Text style={styleChipTextRealizado}>Realizado</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleConfirmUpdateRealizacion(OrdenRealizado.NO_REALIZADA)
                  }
                  style={styleChipNoRealizado}>
                  <Text style={styleChipTextNoRealizado}>No Realizado</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleConfirmUpdateRealizacion(OrdenRealizado.FALTO)
                  }
                  style={styleChipFalto}>
                  <Text style={styleChipTextFalto}>Faltó</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleCloseModal}>
                <Icons name="close" size={25} color={THEME_COLORS.primary} />
              </TouchableOpacity>
            </View>

            {/* PACIENTE E INFORMACION */}
            <View style={styles.modalBodySection}>
              <Icons
                style={styles.modalBodyIcon}
                name="account-multiple-outline"
                size={25}
                color={THEME_COLORS.gray}
              />
              <TouchableOpacity
                style={styles.launchIcon}
                onPress={handleVerPaciente}>
                <Text style={styles.modalBodyText}>{item.paciente} </Text>

                <Icons name="launch" size={15} color={THEME_COLORS.gray} />
              </TouchableOpacity>
            </View>

            {/* FECHA DE LA CITA */}
            <View style={styles.modalBodySection}>
              <Icons
                style={styles.modalBodyIcon}
                name="clock-time-four-outline"
                size={25}
                color={THEME_COLORS.gray}
              />
              <Text style={styles.modalBodyText}>{modalDateTime}</Text>
            </View>

            {/* DIRECCION */}
            <View style={styles.modalBodySection}>
              <Icons
                style={styles.modalBodyIcon}
                name="home-outline"
                size={25}
                color={THEME_COLORS.gray}
              />
              <Text style={styles.modalBodyText}>{item.direccion}</Text>
            </View>

            {/* MAPA */}
            <View style={styles.modalBodySectionWithoutIcon}>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={handleOpenGoogleMaps}>
                <Image
                  source={require('../assets/google-maps.jpg')}
                  style={styles.directionImage}
                />
                <Text style={styles.directionButtonText}>
                  Abrir en Google Maps
                </Text>
              </TouchableOpacity>
            </View>

            {/* EDITAR OBSERVACIONES */}
            <View style={styles.modalBodySection}>
              <Icons
                style={styles.modalBodyIcon}
                name="pencil-outline"
                size={25}
                color={THEME_COLORS.gray}
              />
              {/* <Text style={styles.modalBodyText}>
                {item.evolucion || 'Agregar una observacion a la cita'}
              </Text> */}
              <TextInput
                style={styles.modalBodyTextArea}
                multiline={true}
                numberOfLines={4}
                placeholder="Agregar una observacion a la cita..."
                placeholderTextColor={THEME_COLORS.gray}
                value={observacion}
                onChangeText={text => setObservacion(text)}
                onFocus={() => setEditEvaluacion(true)}
              />
            </View>

            {/* SAVE BUTTON */}
            {editEvaluacion && (
              <View style={styles.modalBodySectionWithoutIcon}>
                <TouchableOpacity
                  style={styles.evaluacionButton}
                  onPress={handleUpdateEvaluacion}>
                  <Text style={styles.evaluacionButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
  },
  modalView: {
    width: '100%',
    backgroundColor: THEME_COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: THEME_COLORS.tertiary,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  closeModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  realizacionChips: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  realizacionChip: {
    borderColor: THEME_COLORS.primary,
    borderWidth: 1.2,
    padding: 8,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  realizacionChipText: {
    color: THEME_COLORS.primary,
    fontSize: 12,
  },
  selectedRealizacionChip: {
    backgroundColor: THEME_COLORS.primary,
    borderColor: THEME_COLORS.primary,
    borderWidth: 1.2,
    padding: 8,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  selectedRealizacionChipText: {
    color: THEME_COLORS.white,
    fontSize: 12,
  },
  modalBody: {
    padding: 20,
    flex: 1,
  },
  modalBodySectionWithoutIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 40,
    width: '90%',
  },
  modalBodySection: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center', // TOFIX
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
  },
  modalBodyIcon: {
    marginRight: 15,
  },
  modalBodyText: {
    fontSize: 14,
    color: THEME_COLORS.black,
    textTransform: 'capitalize',
  },
  modalBodySubText: {
    fontSize: 12,
  },
  pacienteText: {
    color: THEME_COLORS.black,
    fontSize: 20,
  },
  modalBodyDireccion: {
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
  modalBodyTextArea: {
    textAlignVertical: 'top',
    fontSize: 14,
    color: THEME_COLORS.black,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    height: 100,
  },
  evaluacionButton: {
    backgroundColor: THEME_COLORS.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  evaluacionButtonText: {
    color: THEME_COLORS.white,
    fontSize: 16,
  },
  launchIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 5,
  },
});

export default AgendaItemModal;
