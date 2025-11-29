import React from "react";
import { createContext, useContext, useState } from "react";
import { Tab } from "tosslib";

const TabsContext = createContext<{
	value: string;
	onChange: (value: string) => void;
}>({
	value: "",
	onChange: () => {},
});

function Tabs({
	defaultValue,
	children,
}: {
	defaultValue: string;
	children: React.ReactNode;
}) {
	const [value, onChange] = useState<string>(defaultValue);
	return (
		<TabsContext.Provider value={{ value, onChange }}>
			{children}
		</TabsContext.Provider>
	);
}

const TabList = ({ children }: { children: React.ReactElement[] }) => {
	const { onChange, value } = useContext(TabsContext);
	return (
		<Tab onChange={onChange} defaultValue={value}>
			{children}
		</Tab>
	);
};

const TabItem = ({ value, label }: { value: string; label: string }) => {
	const { value: selectedValue, onChange } = useContext(TabsContext);
	return (
		<Tab.Item
			onClick={() => onChange(value)}
			value={value}
			selected={value === selectedValue}
			key={value}
		>
			{label}
		</Tab.Item>
	);
};

const TabPanel = ({
	value,
	children,
}: {
	value: string;
	children: React.ReactNode;
}) => {
	const { value: selectedValue } = useContext(TabsContext);
	if (selectedValue !== value) {
		return null;
	}
	return <>{children}</>;
};

Tabs.Panel = TabPanel;
Tabs.List = TabList;
Tabs.Item = TabItem;

export { Tabs };
