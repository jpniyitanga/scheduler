import React, { useState } from 'react'

export default function DayListItem(props) {
  // const [day, setDay] = useState;
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} sports remaining</h3>
    </li>
  );
}