import React from 'react'
import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function useApplicationData() {

  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });


  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers"),
    ]).then((all) => {
      //Set state for both days and appointments
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      
    });
  }, []);

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return daysOfWeek[day];
  }

  function bookInterview(id, interview) {
    console.log("Book interview", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const daysOfWeek = findDay(state.day)
    let day = {
      ...state.days[daysOfWeek],
      spots: state.days[daysOfWeek]
    }

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[daysOfWeek],
        spots: state.days[daysOfWeek]. spots - 1
      }
    } else {
      day = {
        ...state.days[daysOfWeek],
        spots:state.days[daysOfWeek].spots
      }
    }

    let days = state.days;
    days[daysOfWeek] = day;
    

    return Axios.put(`/api/appointments/${id}`, {
      interview,
    }).then((response) => {
      setState({ ...state, appointments });
      setState({ ...state, appointments, days });
      return response;
    });
    
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1,
    };

    let days = state.days;
    days[dayOfWeek] = day;

    return Axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState({ ...state, appointments })
        setState({...state, appointments, days});
      return response;
    });
    
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
  
}
