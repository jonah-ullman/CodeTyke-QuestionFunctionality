import React from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  const [isSelected, setIsSelected] = React.useState(false)

  function toggleSelectionBox() {
    setIsSelected(!isSelected)
  }

  return(
    <div
      className={`selectionBox ${isSelected ? "selectionBox--selected" : ""}`}
      id={"selectionBox" + props.id}
    >
      <img className="selectionBox__image" alt={props.answer.imageAlt} src={props.answer.image} />
      <input className="selectionBox__checkbox"
             type="checkbox"
             onChange={toggleSelectionBox}
      />
      <span className="selectionBox__text">{props.answer.text}</span>
    </div>
   )
}

export default SelectionBox;
