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
  selectedBRollAnnotationId: string | null;
  setSelectedCommentId: (id: string | null) => void;
  setSelectedBRollAnnotationId: (id: string | null) => void;
};

const ScriptTabs: FunctionComponent<ScriptTabsProps> = ({
  selectedCommentId,
  selectedBRollAnnotationId,
  setSelectedCommentId,
  setSelectedBRollAnnotationId
}) => {
  // TODO: Instead pass script props in and use these to populate the script tabs
  // or at least get scripts here by API call to backend. Include an 'X' to close tabs and a '+' to create new tabs.
  // Actually we'll only have one script per project (really no need for more than one) then we'll have the file tab here too.
  const labels = ['Script', 'Files'];
  const tabPanels = [
    <ScriptContainer
      key={1}
      selectedCommentId={selectedCommentId}
      selectedBRollAnnotationId={selectedBRollAnnotationId}
      setSelectedCommentId={setSelectedCommentId}
      setSelectedBRollAnnotationId={setSelectedBRollAnnotationId}
    />
  ];
  // const labels = scripts.map(script => {
  //   // return 'Script ' + script.key;
  //   return 'Script';
  // });
  return (
    <TabLayout labels={labels} className={styles.scriptTabs}>
      {tabPanels}
    </TabLayout>
  );
};

export default ScriptTabs;
