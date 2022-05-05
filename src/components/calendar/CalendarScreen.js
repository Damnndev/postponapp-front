// Componente responsable calendario

import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import moment from "moment";

// importación componentes
import { Navbar } from '../ui/Navbar';
import { CalendarModal } from "./CalendarModal";
import { CalendarEvent } from "./CalendarEvent";

// importamos esqueleto y definición idioma
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import 'moment/locale/es';
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";
import { AddButton } from "../ui/AddButton";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale('es'); // establecemos idioma a español

const localizer = momentLocalizer(moment); // formateo fechas


// Componente del calendario
export const CalendarScreen = () => {

  // Hook que devuelve referencia al dispatch de la acción
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar);

  /* Estado vista */
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  // Creamos eventos:

  /* doble click abrimos modal */
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  /* click se activa el evento */
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }

  /* Al cambiar la vista y recargar se mantiene en esa vista */
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  /* Limpiar evento activo al clicar fuera del evento */
  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  }

  /* Función para aplicar estilos al evento creado en calendario */
  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return{
      style
    }
  };

  return (
    // Pintamos componente navbar, calendar, modal
    <div className='calendar-screen'>

      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent= { onSelectEvent }
        onView = { onViewChange }
        onSelectSlot= { onSelectSlot }
        selectable= { true }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <AddButton />

      {
        (activeEvent) && <DeleteEventFab />
      }


      <CalendarModal />


    </div>
  );
}
