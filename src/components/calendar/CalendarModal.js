// Componente responsable del modal
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/events';
import { uiCloseModal } from '../../actions/ui';

import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

// import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

// Estilos para el modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
// Enlazamos el modal con nuestra app
Modal.setAppElement('#root');

// Establecemos fechas con librería JS momentJS
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const after = now.clone().add(1, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: after.toDate()
}

export const CalendarModal = () => {

  /* Estados */
  const[ dateStart, setDateStart ] = useState(now.toDate());
  const[ dateEnd, setDateEnd ] = useState(after.toDate());
  const[ titleOk, setTitleOk ] = useState(true);
  const[ formValues, setFormValues ] = useState(initEvent);

  // console.log(dateStart,dateEnd);

  /* Hook para estar pendientes del ui y de calendar */
  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);

  /* Hook que devuelve referencia al dispatch de la acción */
  const dispatch = useDispatch();

  const { title, notes, start, end } = formValues; // desestructuramos props de formValues


  /* Hook que está pendiente de los cambios en el activeEvent */
  useEffect(() => {
      if ( activeEvent ) {
          setFormValues( activeEvent );
      } else {
          setFormValues( initEvent );
      }
  }, [activeEvent, setFormValues])


  /* Manejador cambios en los input del formulario */
  const handleInputChange = ({ target }) => {

    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  /* Manejador cierre modal */
  const closeModal = () => {
    dispatch(uiCloseModal()); // cierra modal
    dispatch(eventClearActiveEvent()); // limpia eventos activos
    setFormValues(initEvent);
  }

  /* Manejadores fechas */
  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e
    });
    console.log(typeof formValues.start);
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e
    });
  }

  /* Manejador info formulario y comprobaciones */
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    // Validamos que las horas no coincidan en el mismo día
    if(momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'Fecha de finalización debe de ser mayor a la de inicio', 'error');
    }

    // Validamos que el título del evento sea correcto
    if(title.trim().length < 2) {
      return setTitleOk(false)
    }

    // Si existe el evento lo actualizamos si no lo creamos
    if(activeEvent) {
      dispatch(eventStartUpdate(formValues))
    } else {
      // Gestión del estado al crear un nuevo evento en el calendario
      dispatch(eventStartAddNew(formValues));
    }

    setTitleOk(true);
    closeModal();
  }

  /* Pintamos nuestro modal */
  return (
   <Modal
    isOpen={ modalOpen }
    // onAfterOpen={afterOpenModal}
    onRequestClose={ closeModal }
    style={ customStyles }
    closeTimeoutMS={ 200 }
    className="modal"
    overlayClassName="modal-fondo"
  >
    {/* HTML modal con estilos boostrap */}
    <h1> {(activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
    <hr />
    <form
      className="container"
      onSubmit={ handleSubmitForm }
    >

      <div className="form-group">
        <label>Fecha y hora de inicio</label>
        <DatePicker
          locale="es"
          selected={dateStart}
          onChange={ handleStartDateChange }
          wrapperClassName="datePicker"
          className= "form-control"
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={20}
          timeCaption="time"
          dateFormat="MMM d, yyyy h:mm aa"
        />
        {/* <DateTimePicker
          onChange={ handleStartDateChange }
          value={ start }
          className= "form-control"
        /> */}
      </div>

      <div className="form-group">
        <label>Fecha y hora de finalización</label>
         <DatePicker
          locale="es"
          selected={dateEnd}
          onChange={ handleEndDateChange }
          className= "form-control"
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={20}
          timeCaption="time"
          dateFormat="MMM d, yyyy h:mm aa"
          minDate={ dateStart }
        />
        {/* <DateTimePicker
          onChange={ handleEndDateChange }
          value={ end }
          minDate={ start } // establecer fecha mínima
          className= "form-control"
          format="y-MM-dd h:mm:ss a"
          amPmAriaLabel="Select AM/PM"
        /> */}

      </div>

      <hr />
      <div className="form-group">
        <label>Titulo y notas</label>
        <input
            type="text"
            className={`form-control ${ !titleOk ? 'is-invalid' : 'is-valid' }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
        />
        <small id="emailHelp" className="form-text text-muted">Descripción corta</small>
      </div>

      <div className="form-group">
        <textarea
          type="text"
          className="form-control"
          placeholder="Notas"
          rows="5"
          name="notes"
          value={ notes }
          onChange={ handleInputChange }
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
      </div>

      <button
          type="submit"
          className="btn btn-outline-primary btn-block"
      >
        <i className="far fa-save"></i>
        <span> Guardar</span>
      </button>

    </form>

  </Modal>

  )
}
