import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WeekDay, getMonthFromWeekDay, getWeekDay} from '../utils';
import {THEME_COLORS} from '../contants/theme';
import {addDays, isSameDay} from 'date-fns';

type Props = {
  date: Date;
  onChange: (date: Date) => void;
};

const WeekCalendar = ({date, onChange}: Props) => {
  const [week, setWeek] = useState<WeekDay[]>([]);

  useEffect(() => {
    const weekDays = getWeekDay(date);
    setWeek(weekDays);
  }, [date]);

  const loadWeek = (direction: 'next' | 'prev') => {
    const weekDay = week[0].date;
    const weekDayToLoad =
      direction === 'next' ? addDays(weekDay, 7) : addDays(weekDay, -7);
    const weekDays = getWeekDay(weekDayToLoad);
    setWeek(weekDays);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthText}>{getMonthFromWeekDay(week)}</Text>
      <View style={styles.weekContainer}>
        <View style={styles.weekArrow}>
          <TouchableOpacity
            onPress={() => loadWeek('prev')}
            style={styles.touchable}>
            <Text style={styles.label}>&lt;</Text>
          </TouchableOpacity>
        </View>

        {week.map(weekDay => {
          const textStyles: any[] = [styles.label];
          const touchableStyles: any[] = [styles.touchable];

          const sameDay = isSameDay(weekDay.date, date);
          if (sameDay) {
            textStyles.push(styles.selectedLabel);
            touchableStyles.push(styles.selectedTouchable);
          }

          return (
            <View key={weekDay.formatted} style={styles.weekDayItem}>
              <Text style={styles.weekDayText}>{weekDay.formatted}</Text>
              <TouchableOpacity
                onPress={() => onChange(weekDay.date)}
                style={touchableStyles}>
                <Text style={textStyles}>{weekDay.day}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={styles.weekArrow}>
          <TouchableOpacity
            onPress={() => loadWeek('next')}
            style={styles.touchable}>
            <Text style={styles.label}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  monthText: {
    fontSize: 16,
    textAlign: 'center',
    color: THEME_COLORS.gray,
    textTransform: 'capitalize',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  weekDayText: {
    color: THEME_COLORS.gray,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: THEME_COLORS.black,
    textAlign: 'center',
  },
  selectedLabel: {
    color: THEME_COLORS.white,
  },
  touchable: {
    borderRadius: 20,
    padding: 7.5,
    height: 35,
    width: 35,
  },
  selectedTouchable: {
    backgroundColor: THEME_COLORS.primary,
  },
  weekDayItem: {
    alignItems: 'center',
  },
  weekArrow: {
    justifyContent: 'center',
    fontSize: 20,
  },
});

export default WeekCalendar;
