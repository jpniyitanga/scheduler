import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";



// const appointments = {
//   1: {
//     id: 1,
//     time: "12pm",
//   },
//   2: {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   3: {
//     id: 3,
//     time: "2pm",
//   },
//   4: {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
//   5: {
//     id: 5,
//     time: "4pm",
//   },
// };

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

    const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...state, days }));

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
    ]).then((all) => {
      //Set state for both days and appointments
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
      
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
            />
          );
          
        })}
      </section>
    </main>
  );
}
