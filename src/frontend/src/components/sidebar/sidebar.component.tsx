import React from 'react';

import { Tabs } from '../../components'
import type { SidebarProps } from './sidebar.types.ts'
import './sidebar.styles.css';

const Comp = ({ parentId }: { parentId?: string }) => {
  return (
    <div>
      TAB {parentId}
    </div>
  )
}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className="sidebar-container flex flex-col gap-3 py-3 border-r-[1px] border-black/10">
      <div className="px-3">
        <div className='px-3 py-1 border-[1px] border-black/40 rounded-full'>
          <input className='w-full' placeholder="filter" />
        </div>
      </div>

      <div className='flex px-3 items-center justify-center'>
        <Tabs id="groupA" defaultValue="a1">
          <Tabs.List>
            <Tabs.Trigger value="a1">mocks</Tabs.Trigger>
            <Tabs.Trigger value="a2">logs</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a1">
            <Comp />
          </Tabs.Content>
          <Tabs.Content value="a2">Conteúdo A2</Tabs.Content>
        </Tabs>
      </div>
      <h1>sidebar works!</h1>
    </div>
  );
};

export default Sidebar;
