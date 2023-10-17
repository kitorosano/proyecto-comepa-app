import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Fisioterapeuta, Usuario} from '../contants/models';

export type AppState = {
  loading: boolean;
  accessToken: string;
  usuarioLogueado: Usuario | null;
  fisioterapeutaLogueado: Fisioterapeuta | null;
  message: string;
  selectedPaciente: number | null;
};

const initialState: AppState = {
  loading: false,
  accessToken: '',
  usuarioLogueado: null,
  fisioterapeutaLogueado: null,
  message: '',
  selectedPaciente: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setAuthenticatedUser: (
      state,
      action: PayloadAction<{
        token: string;
        datosUsuario: Usuario;
        datosFisioterapeuta: Fisioterapeuta;
      }>,
    ) => {
      state.accessToken = action.payload.token;
      state.usuarioLogueado = action.payload.datosUsuario;
      state.fisioterapeutaLogueado = action.payload.datosFisioterapeuta;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    cleanAuthenticatedUser: state => {
      state.accessToken = '';
      state.usuarioLogueado = null;
      state.fisioterapeutaLogueado = null;
    },
    setSelectedPaciente: (state, action: PayloadAction<number>) => {
      state.selectedPaciente = action.payload;
    },
  },
});

export const {
  setMessage,
  setAuthenticatedUser,
  setAppLoading,
  cleanAuthenticatedUser,
  setSelectedPaciente,
} = appSlice.actions;

export default appSlice.reducer;
