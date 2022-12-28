import React, { FunctionComponent } from 'react';
import ScriptContainer from './ScriptContainer';
import TabLayout from './TabLayout';
import styles from '@styles/components/Scripts.module.scss';

// TODO
/*
type ScriptTabProps = {
  tabs: ScriptContainerProps[];
};

type ScriptContainerProps = {
  toolbarProps: ToolbarProps;
  scriptHtml: string;
};
*/

const ScriptTabs: FunctionComponent = () => {
  // TODO: Instead pass script props in and use these to populate the script tabs
  // or at least get scripts here by API call to backend. Include an 'X' to close tabs and a '+' to create new tabs.
  const scripts = [<ScriptContainer key={1} />];
  const labels = scripts.map(script => {
    // return 'Script ' + script.key;
    return 'Script';
  });
  return (
    <TabLayout labels={labels} className={styles.scriptTabs}>
      {scripts}
    </TabLayout>
  );
};

export default ScriptTabs;
