import React from 'react'
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';


function InterviewerList({ interviewers, interviewer, setInterviewer }) {
  const interviewerListItems = interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem
        key={interviewerObj.id}
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === interviewer}
        setInterviewer={() => { setInterviewer(interviewerObj.id)}}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className='interviewers__list'>{interviewerListItems}</ul>
    </section>
  );
}

export default InterviewerList;