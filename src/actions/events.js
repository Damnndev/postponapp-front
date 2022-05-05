import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


// Para grabar evento en BD
export const eventStartAddNew = (event) => {

  console.log(event);
  return async(dispatch, getState) => {

    // Extraemos del State el uid y name
    const { uid, name } = getState().auth;

    console.log(uid);
    console.log(name);

    try {
      // Hacemos petición POST a '/events' con el evento(event) a grabar
      const resp = await fetchWithToken('events', event, 'POST');
      console.log(resp);
      const body = await resp.json();

      console.log(body);
      // Si la inserción en la base de datos fue correcto
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name
        }
        console.log(event);
        dispatch(eventAddNew(event))
      }

    } catch (error) {
      console.log(error);
    }
  }
}

// Añadimos nuevo evento
const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
});

// Activamos el evento
export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

// Limpiamos la nota activa al cerrar el modal
export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

// Evento actualizado
export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});


// Evento eliminado
export const eventDeleted = () => ({ type: types.eventDeleted });