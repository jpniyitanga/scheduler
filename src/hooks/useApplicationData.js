import {useEffect, useReducer } from 'react';
import Axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function getEmpySpotsForDay(state, day) {
  const selectedDay = state.days.find((theDay) => theDay.name === day);  
  return selectedDay.appointments.reduce((acc, curr) => {    
      return state.appointments[curr].interview ? acc : acc + 1;    
    }, 0);
  
  
}

function reducer (state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
        case SET_INTERVIEW: {      
      // const appointment = { ...state.appointments[action.id], interview: { ...action.interview } };            
      // const newState = { ...state, appointments: { ...state.appointments, [action.id]: appointment } }
      
      const newState = { ...state, appointments: { ...state.appointments, [action.id]: { ...state.appointments[action.id], interview: action.interview } } };
      console.log("New state", {newState})
      
      return { ...newState, days: state.days.map((day)=>({...day, spots: getEmpySpotsForDay(newState, day.name)})) };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
        );
      }
    };
    
    
    export default function useApplicationData() {
      const [state, dispatch] = useReducer(reducer, { day: "Monday", days: [], appointments: {}, interviewers: {} });
      // console.log("Initial state", state)
  
  


  const setDay = (day) => dispatch({ type:SET_DAY, day:day }); 

  useEffect(() => {
    Promise.all([
      // Axios.get("/api/debug/reset"),
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers"),
    ]).then((all) => {
      //Fetch application data and set state
      dispatch({
        type: SET_APPLICATION_DATA,         
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });      
    });
  }, []);

  function bookInterview(id, interview) { 

    return Axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
      dispatch({ type: SET_INTERVIEW, id, interview});
      // setState({ ...state, appointments, days });
      return response;
      });      
    
  }

  function cancelInterview(id) {

    return Axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        dispatch({type:SET_INTERVIEW, id, interview:null })
        // setState({...state, appointments, days});
      return response;
    });    
  }

  return {
    state,
    setDay,    
    bookInterview,    
    cancelInterview
  };
  
}
