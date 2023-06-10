import classNames from 'classnames';
import React, { useState } from 'react'
import 'components/DayListItem.scss';

  const formatSpots = (spots) => {
    if (spots === 1) {
      return "1 spot remaining";
    } else if (spots === 0) {
      return "no spots remaining";
    } else if (spots > 1) {
      return `${spots} spots remaining`;
    }
  };

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={ props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      {/* Line below shows remaining spots for each day */}
      <h3 className="text--light">{formatSpots(props.spots)} </h3> 
    </li>
  );
  
}