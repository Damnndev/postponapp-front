import moment from "moment";

// Modificamos las fechas de los eventos generando un objeto tipo Date en vez de String
export const prepareEvents = ( events = [] ) => {

  return events.map((event) => ({
      ...event,
      end: moment(event.end).toDate(),
      start: moment(event.start).toDate(),
    })
  );
}