/* eslint-disable */
import { types } from '../../types/types';


describe('Pruebas en Types', () => {

  test('Los types deben de ser iguales', () => {

    expect(types).toEqual({

      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',

      // Types para eventos
      eventSetActive: '[event] Set Active',
      eventAddNew: '[event] Add new',
      eventClearActiveEvent: '[event] Clear active event',
      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deleted',



      // Types para autenticación
      authChecking: '[auth] Checking login state',
      authCheckingFinish: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start Register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    })
  })
})