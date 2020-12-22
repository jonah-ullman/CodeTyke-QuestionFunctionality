import React from 'react';

import './Styles.scss';

const SelectionBox = ({answer, id, responseData, setResponseData}) => {
  const [isSelected, setIsSelected] = React.useState(false)

  React.useEffect(() => {
    const updatedResponseData = {
      ...responseData,
      [answer.text]: {
        isSelected,
        isResponseCorrect: isSelected === answer.isCorrect
      }
    }
    setResponseData(updatedResponseData)
  }, [isSelected])

  return(
    <div
      className={`selectionBox ${isSelected ? "selectionBox--selected" : ""}`}
      id={"selectionBox" + id}
    >
      <img className="selectionBox__image" alt={answer.imageAlt} src={answer.image} />
      <input
        className="selectionBox__checkbox"
        type="checkbox"
        onChange={() => setIsSelected(!isSelected)}
      />
      <span className="selectionBox__text">{answer.text}</span>
    </div>
   )
}

export default SelectionBox;
