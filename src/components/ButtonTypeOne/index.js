import React from 'react';
import './index.scss';
import classNames from 'classnames';

const ButtonTypeOne = ({ name, onClick, isActive }) => {
  return (
    <button
      className={classNames('ButtonTypeOne', { active: isActive })}
      onClick={onClick}
      disabled={!isActive}
    >
      {name}
    </button>
  );
};

export default ButtonTypeOne;
