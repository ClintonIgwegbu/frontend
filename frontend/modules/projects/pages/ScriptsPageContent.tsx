import React, { FunctionComponent } from 'react';
import styles from '@styles/pages/ScriptsPage.module.scss';
import BRollPreviewContainer from '../components/BRollPreviewContainer';
import ScriptTabs from '../components/ScriptTabs';
import AnnotationsContainer from '../components/AnnotationsContainer';

const ScriptsPage: FunctionComponent = () => {
  return (
    <div className={`${styles.scriptsPage}`}>
      <ScriptTabs />
      <div className={`${styles.scriptsPageRight}`}>
        <BRollPreviewContainer />
        <AnnotationsContainer />
      </div>
    </div>
  );
};

export default ScriptsPage;
