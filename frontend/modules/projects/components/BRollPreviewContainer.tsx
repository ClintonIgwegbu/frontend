import React, { FunctionComponent } from 'react';
import TabLayout from './TabLayout';
import scriptsPageStyles from '@styles/pages/ScriptsPage.module.scss';
import bRollStyles from '@styles/components/BRollPreview.module.scss';
import TrimBar from './TrimBar';

const BRollPreviewContainer: FunctionComponent = () => {
  const labels = ['B-Roll Preview'];
  const bRollPreview = (
    <div key='b-roll' className={bRollStyles.bRollPreviewContainer}>
      <video
        width='100%'
        height='100%'
        controls
        id='b-roll-preview'
        className={bRollStyles.bRollPreview}>
        <source src='/first_youtube_video_1.mov' />
        Video unsupported by your browser.
      </video>
      <div className={bRollStyles.trimBar}>
        <TrimBar />
      </div>
    </div>
  );

  return (
    <TabLayout labels={labels} className={scriptsPageStyles.scriptsPageRightTop}>
      {[bRollPreview]}
    </TabLayout>
  );
};

export default BRollPreviewContainer;
