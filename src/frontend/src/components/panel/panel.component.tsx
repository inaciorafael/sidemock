import React from 'react';

import type { PanelProps } from './panel.model.ts'
import './panel.styles.css';

const Panel: React.FC<PanelProps> = ({}) => {
  return (
    <div className="panel-container">
      <h1>panel works!</h1>
    </div>
  );
};

export default Panel;
