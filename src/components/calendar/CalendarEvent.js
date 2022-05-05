
// Componente que recibe toda la información del evento

export const CalendarEvent = ({ event }) => {

  // desestructuramos la prop event para extraer titulo y nombre
  const {title, user} = event;

  // Pintamos los datos desestructurados en el calendario
  return (
    <div>
      <strong>{ title }</strong>
      <span> - { user.name }</span>
    </div>
  )
}
