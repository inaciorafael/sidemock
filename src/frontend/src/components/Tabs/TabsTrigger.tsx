import type { TabsTriggerProps } from "./Tabs.types";
import { useTabsContext } from "./Tabs";

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { value: active, setValue } = useTabsContext();
  const isActive = active === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-${value}`}
      onClick={() => setValue(value)}
      className={`px-4 cursor-pointer py-2 ${
        isActive ? "border-b-orange-500 border-b-[3px] font-semibold" : "border-b-[3px] border-b-transparent"
      }`}
    >
      {children}
    </button>
  );
}
