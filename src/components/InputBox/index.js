import React from 'react';
import './index.scss';
import checkIcon from '../../assets/images/green_check.png';

const Input = ({ value, setValue, id, placeholder, type }) => {
  return (
    <div className="InputBox">
      <input
        value={value}
        onChange={setValue}
        id={id}
        placeholder={placeholder}
        type={type}
      />
      {value && <img src={checkIcon} />}
    </div>
  );
};

export default Input;
