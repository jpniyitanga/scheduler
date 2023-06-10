import React from 'react'
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
  const interviewerListItems = props.interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem
        key={interviewerObj.id}
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === props.value}
        setInterviewer={(e)=> props.onChange(interviewerObj.id)}
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

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };

