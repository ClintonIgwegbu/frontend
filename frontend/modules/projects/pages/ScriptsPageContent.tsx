import React, { FunctionComponent, useState } from 'react';
import styles from '@styles/pages/ScriptsPage.module.scss';
import BRollPreviewContainer from '../components/BRollPreviewContainer';
import ScriptTabs from '../components/ScriptTabs';
import AnnotationsContainer from '../components/AnnotationsContainer';

const ScriptsPage: FunctionComponent = () => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  return (
    <div className={`${styles.scriptsPage}`}>
      <ScriptTabs
        selectedCommentId={selectedCommentId}
        setSelectedCommentId={setSelectedCommentId}
      />
      <div className={`${styles.scriptsPageRight}`}>
        <BRollPreviewContainer />
        <AnnotationsContainer
          selectedCommentId={selectedCommentId}
          setSelectedCommentId={setSelectedCommentId}
        />
      </div>
    </div>
  );
};

export default ScriptsPage;
