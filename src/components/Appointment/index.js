import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {  
    const interview = {
      student: name,
      interviewer,
    }

    if (name && interviewer) {
      transition(SAVING);
    };

    props.bookInterview(props.id, interview).then(() => transition(SHOW));    
  }
  // console.log("Props: ", props);

function remove() {
  if (mode === CONFIRM) {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  } else {
    transition(CONFIRM);
  }
}
  
  function edit() {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      <>
        <Header time={props.time} />

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          bookInterview={ props.bookInterview}
            onDelete={remove}   
            onEdit={edit}
          />
          )}
        {(mode === CREATE || mode === EDIT) && (
          <Form
            student={props.interview?.student}
            interviewer={props.interview?.interviewer.id}
            // value={props.value}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
          )}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && <Confirm
          onCancel={back}
          onConfirm={remove}
          message="Are you sure?"
        />}        
        
        
      </>
    </article>
  );
}
