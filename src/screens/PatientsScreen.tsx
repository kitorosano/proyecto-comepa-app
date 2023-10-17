import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, TextInput} from 'react-native';
import PacienteItem from '../components/PacienteItem';
import {THEME_COLORS} from '../contants/theme';
import fetchClient from '../utils/fetchClient';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setMessage} from '../redux/appSlice';
import debounce from 'just-debounce-it';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const PATIENTS_PER_PAGE = 10;

// LISTADO EN CUADROS -> Mostrar detalles del paciente luego
const PatientsScreen = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.accessToken);
  const [filteredName, setFilteredName] = useState('');
  const [skipPacientes, setSkipPacientes] = useState(0);
  const [pacientes, setPacientes] = useState([]);
  const [totalPacientes, setTotalPacientes] = useState(0);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setLoading(true);
    getPacientes('', 0);
  }, []);

  const getPacientes = async (
    query: string = '',
    offset = 0,
    limit = PATIENTS_PER_PAGE,
  ) => {
    setLoading(true);
    try {
      const {data, total} = await fetchClient.get(
        `paciente-rest/obtener-pacientes?skip=${offset}&take=${limit}&filteredName=${query}`,
        {
          headers: {Authorization: 'Bearer ' + token},
        },
      );

      setPacientes(data);
      setSkipPacientes(offset);
      setTotalPacientes(total);
    } catch (error: any) {
      dispatch(setMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setFilteredName(text);
    handleSearchDebounce(text);
  };

  const handleSearchDebounce = useCallback(
    debounce((text: string) => {
      getPacientes(text, 0);
    }, 500),
    [],
  );

  const handleChangePage = (page: number) => {
    const newSkip = (page - 1) * PATIENTS_PER_PAGE;
    getPacientes(filteredName, newSkip);
  };

  const clearInput = () => {
    setFilteredName('');
    getPacientes('', 0);
    inputRef.current?.blur();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar paciente ..."
          placeholderTextColor={THEME_COLORS.gray}
          value={filteredName}
          onChangeText={handleSearch}
          ref={inputRef}
        />
        {filteredName && (
          <Icons
            onPress={clearInput}
            style={styles.searchIcon}
            name="close-circle-outline"
            size={25}
            color={THEME_COLORS.gray}
          />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.pacientes}>
        {pacientes.map((item, index) => (
          <PacienteItem key={index} paciente={item} />
        ))}
      </ScrollView>

      <Pagination
        actualPage={Math.ceil(skipPacientes / PATIENTS_PER_PAGE) + 1}
        maxPage={Math.ceil(totalPacientes / PATIENTS_PER_PAGE)}
        changePage={handleChangePage}
      />

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
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: THEME_COLORS.black,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: THEME_COLORS.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: THEME_COLORS.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  pacientes: {
    gap: 5,
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
  searchContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
});

export default PatientsScreen;
