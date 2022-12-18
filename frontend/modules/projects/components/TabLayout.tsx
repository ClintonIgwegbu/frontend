import React, { FunctionComponent, ReactElement } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from '@styles/components/TabLayout.module.scss';

type TabLayoutProps = {
  labels: string[];
  className?: string;
  children: ReactElement[];
};

const TabLayout: FunctionComponent<TabLayoutProps> = ({ labels, className, children }) => {
  const tabs = labels.map(label => {
    return (
      <Tab key={label} className={`${styles.tab}`}>
        {label}
      </Tab>
    );
  });

  let tabPanels: Array<ReactElement> = new Array();
  for (let i = 0; i < labels.length; i++) {
    const child = children[i];
    tabPanels.push(
      <TabPanel key={labels[i]} className={`${styles.tabPanel}`}>
        {child}
      </TabPanel>
    );
  }

  return (
    <Tabs className={`${styles.tabContainer} ${className}`}>
      <TabList className={styles.tabList}>{tabs}</TabList>
      {tabPanels}
    </Tabs>
  );
};

export default TabLayout;
