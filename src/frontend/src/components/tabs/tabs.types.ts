import type { ReactNode } from "react";
import type { InjectedProp } from "../../utils/types";

export interface TabContentInjectedProps extends InjectedProp<'tabGroupId', string> {}

export type TabsContextType = {
  id: string;
  value: string;
  setValue: (val: string) => void;
};

export type TabsProps = {
  id: string;
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  children: ReactNode;
};

export type TabsListProps = { children: ReactNode };

export type TabsTriggerProps = {
  value: string;
  children: ReactNode;
};

export type TabsContentProps = {
  value: string;
  children: ReactNode;
};
