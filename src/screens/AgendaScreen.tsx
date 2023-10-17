import React, {ReactElement, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import WeekCalendar from '../components/WeekCalendar';
import Agenda from '../components/Agenda';

const AgendaScreen = (): ReactElement => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <WeekCalendar
        date={selectedDate}
        onChange={newDate => setSelectedDate(newDate)}
      />

      <Agenda date={selectedDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AgendaScreen;
