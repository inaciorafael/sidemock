import { createContext, useContext } from 'react';
import type { TabsContextType } from './tabs.types';

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be inside <Tab>')

  return ctx
}
