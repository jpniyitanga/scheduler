
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(theDay => theDay.name === day);
  const filteredAppointments = [];
  if (!selectedDay) {
    return filteredAppointments;
  }
  for (let appointment of selectedDay.appointments) { 
    filteredAppointments.push(state.appointments[appointment])
  }
  
  return filteredAppointments;
}

export function getInterview(state, interview) { 
  if (!interview) return null;
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  }
    


