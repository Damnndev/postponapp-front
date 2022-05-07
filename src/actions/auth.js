
// Definimos acción proceso autenticación

import Swal from 'sweetalert2';
import { fetchWihtoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from '../types/types';
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
  return async(dispatch) => {

    // se dispara la petición
    const resp = await fetchWihtoutToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    // si todo sale bien se establece uid y el name
    if(body.ok){
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime()); // guardamos la fecha en la que se crea el token

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))
    // si no muestra un error
    } else {
      Swal.fire('Error', body.msg, 'error');
    }

  }
}
// Definimos proceso de registro
export const startRegister = ( email, password, name ) => {
  return async (dispatch) => {

     // se dispara la petición
    const resp = await fetchWihtoutToken('auth/new', { email, password, name }, 'POST');
    const body = await resp.json();

    // si todo sale bien se establece uid y el name
    if(body.ok){
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime()); // guardamos la fecha en la que se crea el token

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))

    // si no muestra un error
    } else {

      Swal.fire('Error', body.msg, 'error');
    }

  }
}
// Comprobamos credenciales
export const startCheking = () => {
  return async (dispatch) => {

     // se dispara la petición GET
    const resp = await fetchWithToken('auth/renew');
    const body = await resp.json();

    // si todo sale bien se establece uid y el name
    if(body.ok){
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime()); // guardamos la fecha en la que se crea el token

      dispatch(login({
        uid: body.uid,
        name: body.name
      }))

    // si no muestra un error
    } else {
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })


const login = (user) => ({
  type: types.authLogin,
  payload: user
});

// Definimos proceso de cierre de sesión
export const startLogout = () => {
  return (dispatch) => {

    // limpiamos el localStorage y disparamos el logout
    localStorage.clear();
    dispatch(eventLogout());
    dispatch(logout());
  }
}

const logout = () => ({type: types.authLogout});
