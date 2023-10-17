import React, {ReactElement, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import Loading from '../components/Loading';
import {THEME_COLORS} from '../contants/theme';
import {LinearGradient} from 'react-native-linear-gradient';
import {useAppDispatch} from '../redux/hooks';
import fetchClient from '../utils/fetchClient';
import {setAuthenticatedUser, setMessage} from '../redux/appSlice';
import Video from 'react-native-video';

const LoginScreen = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    nickname: 'juan13',
    password: '123456',
  });

  const handleLogin = async () => {
    if (!form.nickname || !form.password)
      return dispatch(setMessage('Todos los campos son requeridos'));

    setLoading(true);

    // create form data
    const formData = new FormData();
    formData.append('nickname', form.nickname);
    formData.append('clave', form.password);

    try {
      // login
      const {mensaje, data} = await fetchClient.post(
        'usuario-rest/login',
        formData,
      );
      const {datosUsuario, token} = data;

      // get fisioterapeuta data
      const {data: datosFisioterapeuta} = await fetchClient.get(
        `usuario-rest/obtener-fisioterapeuta?codigoRrhh=${datosUsuario.codigoRrhh}`,
        {headers: {Authorization: 'Bearer ' + token}},
      );

      dispatch(setMessage(mensaje));
      dispatch(
        setAuthenticatedUser({token, datosUsuario, datosFisioterapeuta}),
      );
    } catch (error: any) {
      console.log(error.message);
      dispatch(setMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/background.mp4')}
        muted
        repeat
        resizeMode={'cover'}
        style={styles.backgroundVideo}
      />
      <LinearGradient
        style={styles.gradient}
        colors={[THEME_COLORS.success, THEME_COLORS.tertiary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      <View style={styles.form}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Nickname"
          placeholderTextColor={THEME_COLORS.white}
          onChangeText={text => setForm({...form, nickname: text})}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          textContentType="password"
          placeholder="Contraseña"
          placeholderTextColor={THEME_COLORS.white}
          onChangeText={text => setForm({...form, password: text})}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

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
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.7,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 150,
    padding: 20,
    gap: 20,
  },
  image: {
    width: 80,
    height: 80,
    objectFit: 'cover',
  },
  input: {
    color: THEME_COLORS.white,
    textShadowColor: THEME_COLORS.black,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    fontSize: 16,
    padding: 10,
    width: '100%',
    borderRadius: 5,
    borderBottomColor: THEME_COLORS.white,
    borderBottomWidth: 1,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.primary,
    padding: 10,
    marginTop: 20,

    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    height: 50,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
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

export default LoginScreen;
