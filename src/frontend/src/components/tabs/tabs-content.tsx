import type { TabsContentProps } from "./tabs.types";
import { useTabsContext } from "./tabs";
import React, { type ReactElement } from "react";

export function TabsContent({ value, children }: TabsContentProps) {
  const { value: active, id: tabGroupId } = useTabsContext();
  const isActive = active === value;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<any>, { tabGroupId });
    }
    return child;
  });

  return (
    <div
      role="tabpanel"
      id={`tab-${value}`}
      hidden={!isActive}
      className="mt-4"
    >
      {isActive && childrenWithProps}
    </div>
  );
}
