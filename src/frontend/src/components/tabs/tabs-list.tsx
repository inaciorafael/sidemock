import type { TabsListProps } from "./Tabs.types";

export function TabsList({ children }: TabsListProps) {
  return <div className="flex gap-2">{children}</div>;
}
