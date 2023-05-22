import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const reset = () => {
    setStudent("");
    setInterviewer("");    
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={ event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="student"
            value={student}
            type="text"
            placeholder={props.student ? props.student : "Enter Student Name"}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(e) => setInterviewer(e)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}> Cancel </Button>
          <Button confirm onClick={props.onSave}> Save </Button>
        </section>
      </section>
    </main>
  );
}
