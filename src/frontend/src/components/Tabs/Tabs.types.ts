import type { ReactNode } from "react";

export type TabsContextType = {
  id: string;
  value: string;
  setValue: (val: string) => void;
};

export type TabsProps = {
  id: string; // id único do grupo
  value?: string; // modo controlado
  defaultValue?: string; // modo não-controlado
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
