import {
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import type { TabsProps, TabsContextType } from "./Tabs.types";

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function useTabsContext(id?: string) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be inside <Tabs>");

  if (id && ctx.id !== id) {
    throw new Error(
      `useTabs(${id}) chamado em Tabs[${ctx.id}] — ids não coincidem`
    );
  }

  return ctx;
}

export function Tabs({ id, value, defaultValue, onChange, children }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value! : internalValue;

  const setValue = useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    },
    [isControlled, onChange]
  );

  return (
    <TabsContext.Provider value={{ id, value: currentValue, setValue }}>
      <div className="w-full" role="tablist">{children}</div>
    </TabsContext.Provider>
  );
}
