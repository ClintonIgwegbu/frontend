import React, { FunctionComponent, useState } from 'react';
import styles from '@styles/pages/ScriptsPage.module.scss';
import BRollPreviewContainer from '../components/BRollPreviewContainer';
import ScriptTabs from '../components/ScriptTabs';
import AnnotationsContainer from '../components/AnnotationsContainer';

const ScriptsPage: FunctionComponent = () => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [selectedBRollAnnotationId, setSelectedBRollAnnotationId] = useState<string | null>(null);

  return (
    <div className={`${styles.scriptsPage}`}>
      <ScriptTabs
        selectedBRollAnnotationId={selectedBRollAnnotationId}
        selectedCommentId={selectedCommentId}
        setSelectedCommentId={setSelectedCommentId}
        setSelectedBRollAnnotationId={setSelectedBRollAnnotationId}
      />
      <div className={`${styles.scriptsPageRight}`}>
        <BRollPreviewContainer />
        <AnnotationsContainer
          selectedBRollAnnotationId={selectedBRollAnnotationId}
          selectedCommentId={selectedCommentId}
          setSelectedBRollAnnotationId={setSelectedBRollAnnotationId}
          setSelectedCommentId={setSelectedCommentId}
        />
      </div>
    </div>
  );
};

export default ScriptsPage;
