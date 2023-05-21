import React from 'react'
import DayListItem from './DayListItem';

export default function DayList(props) {
  // const { days, day, setDay } = props;

  const dayListItems = props.days.map((dayObj) => {
    return (
      <DayListItem
        key={dayObj.id}
        name={dayObj.name}
        spots={dayObj.spots}
        selected={dayObj.name === props.value}
        setDay={props.onChange}
      />
    );
  });
  return <ul> {dayListItems}</ul>;
}

