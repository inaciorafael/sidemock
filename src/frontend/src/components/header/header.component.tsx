import React from 'react';

import type { HeaderProps } from './header.types.ts'
import './header.styles.css';

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="header-container border-b-[1px] border-black/10 justify-between gap-3 flex flex-row items-center px-3">
      <div className="flex flex-1 flex-row items-center gap-3">
        <button className="bg-orange-500 px-3 py-1 text-white rounded">+ new</button>
        <button className="bg-black/60 px-3 py-1 text-white rounded">import</button>
      </div>

      <div className="flex flex-1 justify-center flex-row items-center gap-3">
        <span className="font-bold">Workspace</span>
      </div>

      <div className='flex-1'></div>
    </div>
  );
};

export default Header;
