
//Returns appointment object inside appointments instead of array in days.
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

//Return interview object with two keys (student and interviewer). Interviewer is an object in interviewers
export function getInterview(state, interview) { 
  if (!interview) return null;
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}
  
// Returns interviewer object in interviwers
export function getInterviewersForDay(state, day) {
  console.log(state)
  const selectedDay = state.days.find((theDay) => theDay.name === day);
  const filterdInterviewers = [];
  if (!selectedDay) {
    return filterdInterviewers;
  }
  for (let interviewer of selectedDay.interviewers) {
    filterdInterviewers.push(state.interviewers[interviewer]);
  }

  return filterdInterviewers;
}
    


