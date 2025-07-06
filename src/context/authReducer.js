import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from './types';

export default (state, action) => {
  console.log('%c[REDUCER] Acción recibida:', 'color: orange', action);

  switch (action.type) {
    case USER_LOADED:
      console.log('%c[REDUCER] Caso: USER_LOADED', 'color: green');
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log('%c[REDUCER] Caso: LOGIN/REGISTER_SUCCESS', 'color: green');
      console.log('[REDUCER] Guardando token en localStorage:', action.payload.token);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      console.log('%c[REDUCER] Caso: FALLO o LOGOUT', 'color: red');
      console.log('[REDUCER] Eliminando token de localStorage.');
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};