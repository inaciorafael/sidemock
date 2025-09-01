import React from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import { Tabs, Mocks, DailyNotes } from '../../components'
import type { SidebarProps } from './sidebar.types.ts'
import './sidebar.styles.css';

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className="sidebar-container overflow-y-scroll scrollbar-none h-[var(--content-height)] flex flex-col gap-3 py-3 border-r-[1px] border-black/10">
      <div className="px-3 sticky top-0">
        <div className='px-3 flex bg-white flex-row items-center gap-2 py-1 border-[1px] border-black/40 rounded-full'>
          <HiOutlineMagnifyingGlass className='text-xl text-black/70' />
          <input className='w-full' placeholder="search" />
        </div>
      </div>

      <div className='flex px-3 items-center justify-center'>
        <Tabs id="groupA" defaultValue="a1">
          <Tabs.List>
            <Tabs.Trigger value="a1">mocks</Tabs.Trigger>
            <Tabs.Trigger value="a2">daily notes</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a1">
            <Mocks />
            <Mocks />
            <Mocks />
          </Tabs.Content>
          <Tabs.Content value="a2">
            <DailyNotes />
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
};

export default Sidebar;
