import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const Button = ({ label, inactive, isLoading, customIcon, handleSubmit }) => {

  let icon;

  let loader = <FontAwesomeIcon icon={faSync} className={`submitButton__iconLoader`} />

  if(isLoading){
    icon = loader;
  } else if(customIcon){
    icon = customIcon;
  }

  return (
    <button className={"submitButton " + (inactive ? "submitButton--inactive" : "")} onClick={handleSubmit} disabled={inactive}>
      {label}
      <span className="submitButton__icon">
        {icon}
      </span>
    </button>
  )
}

export default Button;
