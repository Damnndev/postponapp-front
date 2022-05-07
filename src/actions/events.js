import Swal from 'sweetalert2';
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

// Para grabar evento en BD
export const eventStartAddNew = (event) => {

  return async(dispatch, getState) => {

    // Extraemos del State el uid y name
    const { uid, name } = getState().auth;

    try {
      // Hacemos petición POST a '/events' con el evento(event) a grabar
      const resp = await fetchWithToken('events', event, 'POST');
      const body = await resp.json();

      // Si la inserción en la base de datos fue correcta
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name
        }
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

// Actualizar un evento
export const eventStartUpdate = (event) => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken(`events/${ event.id}`, event, 'PUT' );
            const body = await resp.json();

            if (body.ok) {
                dispatch( eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error'); // Mostramos alert en caso de error
            }

        } catch (error) {
            console.log(error)
        }
    }
}
const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});

// Eliminamos evento
export const eventStartDelete = () => {
  return async (dispatch, getState) => {

    const { id } = getState().calendar.activeEvent;

    try {
        const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE' );
        const body = await resp.json();

        if (body.ok) {
            dispatch( eventDeleted());
        } else {
            Swal.fire('Error', body.msg, 'error'); // Mostramos alert en caso de error
        }

    } catch (error) {
        console.log(error)
    }
  }
}
const eventDeleted = () => ({ type: types.eventDeleted });

// Obtiene todos los eventos
export const eventStartLoading = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchWithToken('events');
            const body = await resp.json();

            const events = prepareEvents(body.events);
            dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error)
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

// Limpiamos los estados de los eventos al cerrar sesión
export const eventLogout =() => ({ type: types.eventLogout });