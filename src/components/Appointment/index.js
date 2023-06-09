import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    if (name && interviewer) {
      transition(SAVING);
    }

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function remove() {
    if (mode === CONFIRM) {
      transition(DELETING, true);
      props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true));
    } else {
      transition(CONFIRM);
    }
  }

  function edit() {
    transition(EDIT);
  }
  return (
    <article className="appointment" data-testid="appointment">
      <>
        <Header time={props.time} />

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            bookInterview={props.bookInterview}
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
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && (
          <Confirm onCancel={back} onConfirm={remove} message="Are you sure?" />
        )}

        {mode === ERROR_SAVE && (
          <Error message="Saving appointment failed" onClose={back} />
        )}

        {mode === ERROR_DELETE && (
          <Error message="Deleting appointment failed" onClose={back} />
        )}
      </>
    </article>
  );
}
