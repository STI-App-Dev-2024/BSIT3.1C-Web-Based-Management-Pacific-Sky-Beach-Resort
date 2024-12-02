import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const generateDateRangeEvents = (startDate, endDate, title) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const events = [];
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    events.push({
      title: title || "Reserved",
      start: new Date(date),
      allDay: true,
    });
  }

  return events;
};

const CalendarComponent = ({ bookings }) => {
  const events = bookings?.flatMap((booking) =>
    generateDateRangeEvents(booking.startDate, booking.endDate, booking.title)
  );

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      }}
    />
  );
};

export default CalendarComponent;
