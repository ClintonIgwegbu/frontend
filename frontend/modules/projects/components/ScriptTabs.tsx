import React, { FunctionComponent } from 'react';
import ScriptContainer from './ScriptContainer';
import TabLayout from './TabLayout';
import styles from '@styles/components/Scripts.module.scss';
import { Editor } from '@tiptap/react';

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

type ScriptTabsProps = {
  selectedCommentId: string | null;
  setSelectedCommentId: (id: string | null) => void;
};

const ScriptTabs: FunctionComponent<ScriptTabsProps> = ({
  selectedCommentId,
  setSelectedCommentId
}) => {
  // TODO: Instead pass script props in and use these to populate the script tabs
  // or at least get scripts here by API call to backend. Include an 'X' to close tabs and a '+' to create new tabs.
  const scripts = [
    <ScriptContainer
      key={1}
      selectedCommentId={selectedCommentId}
      setSelectedCommentId={setSelectedCommentId}
    />
  ];
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
