import React from 'react';

import type { DailyNotesProps } from './daily-notes.types.ts'
import { useTabs } from '../../hooks'
import './daily-notes.styles.css';

const DailyNotes: React.FC<DailyNotesProps> = ({ tabGroupId }) => {
  const { id } = useTabs(tabGroupId)

  return (
    <div className="daily-notes-container">
      <h1>daily-notes works! {id}</h1>
    </div>
  );
};

export default DailyNotes;
