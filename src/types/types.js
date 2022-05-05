// definimos las acciones
export const types = {

  uiOpenModal: '[ui] Open modal',
  uiCloseModal: '[ui] Close modal',

  // Types para eventos
  eventSetActive: '[event] Set Active',
  eventStartAddNew: '[event] Start add new',
  eventAddNew: '[event] Add new',
  eventClearActiveEvent: '[event] Clear active event',
  eventUpdated: '[event] Event updated',
  eventDeleted: '[event] Event deleted',



  // Types para autenticación
  // authChecking: '[auth] Checking login state',
  authCheckingFinish: '[auth] Finish checking login state',
  authStartLogin: '[auth] Start login',
  authLogin: '[auth] Login',
  authStartRegister: '[auth] Start Register',
  authStartTokenRenew: '[auth] Start token renew',
  authLogout: '[auth] Logout',
}