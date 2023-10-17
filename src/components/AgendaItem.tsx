import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {addDateTimeDuration, formatTimeString} from '../utils/index';
import {
  OrdenRealizado,
  OrdenesFisioterapeuta,
  OrderRealizadoValues,
} from '../contants/models';
import {THEME_COLORS} from '../contants/theme';

type Props = {
  item: OrdenesFisioterapeuta;
  handleSelectAgendaItem: () => void;
};

const AgendaItem = ({item, handleSelectAgendaItem}: Props) => {
  if (!item)
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No hay eventos para este dia</Text>
      </View>
    );

  const {paciente, hora, duracion, realizacion} = item;
  const styleEstadoColor =
    realizacion === OrdenRealizado.PENDIENTE
      ? THEME_COLORS.warning
      : realizacion === OrdenRealizado.REALIZADA
      ? THEME_COLORS.success
      : realizacion === OrdenRealizado.FALTO
      ? THEME_COLORS.danger
      : THEME_COLORS.gray;

  const nombresApellidosPaciente = paciente.split(' ');
  return (
    <TouchableOpacity onPress={handleSelectAgendaItem} style={styles.item}>
      <View>
        <Text style={styles.itemDateTime}>
          {formatTimeString(hora)} - {addDateTimeDuration(hora, duracion)}
        </Text>
      </View>
      <Text style={styles.itemTitleText}>
        {nombresApellidosPaciente[0]} {nombresApellidosPaciente[2]}
      </Text>
      {/* TODO: CAMBIAR POR ICONO  */}
      <Text style={[styles.itemSubTitleText, {color: styleEstadoColor}]}>
        {OrderRealizadoValues[realizacion]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemDateTime: {
    color: 'black',
    fontWeight: 'bold',
  },
  itemTimeTo: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  itemSubTitleText: {
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'hsl(40, 70%, 50%)',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});

export default AgendaItem;
