import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  AgendaList,
  CalendarProvider,
  LocaleConfig,
} from 'react-native-calendars';
import {dateToStringYYYYMMDD, formatPrettyDate, getWeekDay} from '../utils';
import {THEME_COLORS} from '../contants/theme';
import AgendaItem from './AgendaItem';
import AgendaItemModal from './AgendaItemModal';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import fetchClient from '../utils/fetchClient';
import {setMessage} from '../redux/appSlice';
import {OrdenServicioPorFecha, OrdenesFisioterapeuta} from '../contants/models';
import Loading from './Loading';
import {
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
} from '../utils/index';

LocaleConfig.locales['es'] = {
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

type Props = {
  date: Date;
};

const Agenda = ({date}: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const idFisioterapeuta = useAppSelector(
    state => state.fisioterapeutaLogueado?.idFisioterapeuta,
  );
  const accesstoken = useAppSelector(state => state.accessToken);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgendaItem, setSelectedAgendaItem] = useState(null);
  const [ordenes, setOrdenes] = useState<OrdenServicioPorFecha[] | any>([]);

  useEffect(() => {
    console.log(date);
    if (date && idFisioterapeuta && accesstoken) {
      obtenerOrdenes(idFisioterapeuta, accesstoken, date);
    }
  }, [idFisioterapeuta, accesstoken, date]);

  const obtenerOrdenes = async (
    _idFisioterapeuta: number,
    _accesstoken: string,
    _date: Date,
  ) => {
    setLoading(true);
    try {
      const dates = getWeekDay(date).map(weekDay => weekDay.dateString);

      const fechaDesde = dates[0];
      const fechaHasta = dates[dates.length - 1];
      const {data} = await fetchClient.get(
        `reserva-rest/obtener-ordenes-fisio?idFisioterapeuta=${_idFisioterapeuta}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`,
        {
          headers: {Authorization: 'Bearer ' + _accesstoken},
        },
      );
      console.log(data);

      const mappedOrdenes: OrdenServicioPorFecha[] = Object.entries(data).map(
        ([key, value]) => ({
          title: key,
          data: value as OrdenesFisioterapeuta[],
        }),
      );

      setOrdenes(mappedOrdenes);
    } catch (error: any) {
      dispatch(setMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(({item}: any) => {
    return (
      <AgendaItem
        item={item}
        handleSelectAgendaItem={() => handleSelectAgendaItem(item)}
      />
    );
  }, []);

  const handleSelectAgendaItem = (item: any) => {
    setSelectedAgendaItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedAgendaItem(null);
    setModalVisible(false);
  };

  return (
    <CalendarProvider date={dateToStringYYYYMMDD(date)} disabledOpacity={0.6}>
      <AgendaList
        dayFormatter={_date => formatPrettyDate(_date)}
        sections={ordenes}
        renderItem={renderItem}
        sectionStyle={styles.section}
      />

      {modalVisible && (
        <AgendaItemModal
          modalVisible={!!modalVisible}
          item={selectedAgendaItem}
          closeModal={handleCloseModal}
        />
      )}

      {loading && (
        <View style={styles.loadingView}>
          <Loading loading={loading} />
        </View>
      )}
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: THEME_COLORS.white,
    color: THEME_COLORS.tertiary,
    textTransform: 'uppercase',
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
});

export default Agenda;
