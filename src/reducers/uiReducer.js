import { types } from "../types/types";

const initialState = {
  modalOpen: false,
}

// Reducer función que recibe dos parámetros, (estado inicial y una acción)
// dependiendo del tipo de acción realizará una operación u otra en el estado.
export const uiReducer = ( state = initialState, action ) => {

  switch( action.type ) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true
      }

    case types.uiCloseModal:
    return {
      ...state,
      modalOpen: false
    }

    default:
      return state;
  }
}