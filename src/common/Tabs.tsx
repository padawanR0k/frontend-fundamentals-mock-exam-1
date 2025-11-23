import { createContext, useContext, useState } from 'react';
import { Tab } from 'tosslib';

const TabsContext = createContext<{ value: string; onChange: (value: string) => void }>({
  value: '',
  onChange: () => {},
});

function Tabs({
  defaultValue,
  children,
  tabKeys,
}: {
  defaultValue: string;
  children: React.ReactNode;
  tabKeys: Array<{ value: string; label: string }>;
}) {
  const [value, onChange] = useState<string>(defaultValue);
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <Tab onChange={onChange} defaultValue={defaultValue}>
        {tabKeys.map(tabKey => (
          <Tab.Item value={tabKey.value} selected={value === tabKey.value} key={tabKey.value}>
            {tabKey.label}
          </Tab.Item>
        ))}
      </Tab>
      {children}
    </TabsContext.Provider>
  );
}

const TabPanel = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const { value: selectedValue } = useContext(TabsContext);
  if (selectedValue !== value) {
    return null;
  }
  return <>{children}</>;
};

Tabs.Panel = TabPanel;

export { Tabs };
