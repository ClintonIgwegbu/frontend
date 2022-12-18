import React, { FunctionComponent } from 'react';
import styles from '@styles/pages/ScriptsPage.module.scss';
import BRollPreviewContainer from '../components/BRollPreviewContainer';
import ScriptContainer from '../components/ScriptContainer';

const ScriptsPage: FunctionComponent = () => {
  return (
    <div className={`${styles.scriptsPage}`}>
      <ScriptContainer />
      <BRollPreviewContainer />
    </div>
  );
};

export default ScriptsPage;
