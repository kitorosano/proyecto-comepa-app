import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {THEME_COLORS} from '../contants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  actualPage: number;
  maxPage: number;
  changePage: (page: number) => void;
};

const Pagination = ({actualPage, maxPage, changePage}: Props) => {
  const disabledPrevious = actualPage === 1;
  const disabledNext = actualPage === maxPage;

  const stylesIfDisabled = (disabled: boolean) => {
    return disabled ? {opacity: 0.5} : {};
  };

  const handleChangePage = (page: number) => {
    if (page >= 1 && page <= maxPage) {
      changePage(page);
    }
  };

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        disabled={disabledPrevious}
        style={[styles.paginationButton, stylesIfDisabled(disabledPrevious)]}
        onPress={() => handleChangePage(1)}>
        <Icons
          style={styles.paginationButtonIcon}
          name="chevron-double-left"
          size={25}
          color={THEME_COLORS.gray}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledPrevious}
        style={[styles.paginationButton, stylesIfDisabled(disabledPrevious)]}
        onPress={() => handleChangePage(actualPage - 1)}>
        <Icons
          style={styles.paginationButtonIcon}
          name="chevron-left"
          size={25}
          color={THEME_COLORS.gray}
        />
      </TouchableOpacity>

      {
        <Text style={styles.paginationButtonText}>
          {actualPage} de {maxPage}
        </Text>
      }

      <TouchableOpacity
        disabled={disabledNext}
        style={[styles.paginationButton, stylesIfDisabled(disabledNext)]}
        onPress={() => handleChangePage(actualPage + 1)}>
        <Icons
          style={styles.paginationButtonIcon}
          name="chevron-right"
          size={25}
          color={THEME_COLORS.gray}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledNext}
        style={[styles.paginationButton, stylesIfDisabled(disabledNext)]}
        onPress={() => handleChangePage(maxPage)}>
        <Text style={styles.paginationButtonText}>{'>>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  paginationButton: {
    backgroundColor: THEME_COLORS.white,
    borderRadius: 10,
    padding: 10,
    width: 50,
    shadowColor: THEME_COLORS.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  paginationButtonText: {
    fontSize: 16,
    color: THEME_COLORS.gray,
    textAlign: 'center',
  },
  paginationButtonIcon: {
    textAlign: 'center',
  },
});

export default Pagination;
