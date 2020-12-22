import React from 'react';

import './Styles.scss';

const SelectionBox = ({id, answer, responseData, setResponseData}) => {
  const [isSelected, setIsSelected] = React.useState(false)

  function toggleSelectionBox() {
    setIsSelected(!isSelected)
  }

  React.useEffect(() => {
    const previousResponseData = responseData
    const isCorrectResponse = isSelected === answer.isCorrect
    const updatedResponseData = {
      ...previousResponseData,
      [answer.text]: {
        isSelected,
        isCorrectResponse
      }
    }
    setResponseData(updatedResponseData)
  }, [isSelected, answer, responseData, setResponseData])

  return(
    <div
      className={`selectionBox ${isSelected ? "selectionBox--selected" : ""}`}
      id={"selectionBox" + id}
    >
      <img className="selectionBox__image" alt={answer.imageAlt} src={answer.image} />
      <input className="selectionBox__checkbox"
             type="checkbox"
             onChange={toggleSelectionBox}
      />
      <span className="selectionBox__text">{answer.text}</span>
    </div>
   )
}

export default SelectionBox;
