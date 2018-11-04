import React from 'react';
import './FloatingButton.css';

const FloatingButton = () => {
  return (
    <div className="FloatingButton">
      <div id="container-floating">
        <div
          id="floating-button"
          data-toggle="tooltip"
          data-placement="left"
          data-original-title="Create">
          <p className="plus">+</p>
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;
