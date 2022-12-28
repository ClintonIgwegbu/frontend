import React, { FunctionComponent } from 'react';
import styles from '@styles/pages/ScriptsPage.module.scss';
import BRollPreviewContainer from '../components/BRollPreviewContainer';
import ScriptTabs from '../components/ScriptTabs';

const ScriptsPage: FunctionComponent = () => {
  return (
    <div className={`${styles.scriptsPage}`}>
      <ScriptTabs />
      <BRollPreviewContainer />
    </div>
  );
};

export default ScriptsPage;
