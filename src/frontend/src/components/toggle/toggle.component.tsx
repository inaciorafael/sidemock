import React from 'react';

import type { ToggleProps } from './toggle.model.ts'
import './toggle.styles.css';

const Toggle: React.FC<ToggleProps> = ({}) => {
  return (
    <div className="toggle-container">
      <h1>toggle works!</h1>
    </div>
  );
};

export default Toggle;
