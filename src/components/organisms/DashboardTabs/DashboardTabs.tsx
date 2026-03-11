"use client";
import { Tabs } from "@/src/components/molecules/Tabs/Tabs";
import { PendingStatusScreen } from "@/src/components/organisms/DashboardStatusScreens";

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue={"foo"}>
      <Tabs.List>
        <Tabs.Trigger value="foo">foo</Tabs.Trigger>
        <Tabs.Trigger value="bar">bar</Tabs.Trigger>
        <Tabs.Trigger value="baz">baz</Tabs.Trigger>
        <Tabs.Trigger value="bazzz">bazzz</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="foo">
        <PendingStatusScreen />
      </Tabs.Panel>
      <Tabs.Panel value="bar">Bar</Tabs.Panel>
      <Tabs.Panel value="baz">Baz</Tabs.Panel>
      <Tabs.Panel value="bazzh">Baz</Tabs.Panel>
    </Tabs>
  );
};
