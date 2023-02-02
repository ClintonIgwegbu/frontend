import React, { FunctionComponent } from 'react';
import TabLayout from './TabLayout';
import scriptsPageStyles from '@styles/pages/ScriptsPage.module.scss';
import bRollStyles from '@styles/components/BRollPreview.module.scss';
import TrimBar from './TrimBar';
import VideoControls from './VideoControls';
import VideoContainer from './VideoContainer';

const BRollPreviewContainer: FunctionComponent = () => {
  const labels = ['B-Roll Preview'];
  const bRollPreview = (
    <div key='b-roll' className={bRollStyles.bRollPreviewContainer}>
      {/* <video
        width='100%'
        height='100%'
        controls
        controlsList='nodownload'
        id='b-roll-preview'
        className={bRollStyles.bRollPreview}>
        <source src='/60 Second Cut.mp4' />
        Video unsupported by your browser.
      </video>
      <div className={bRollStyles.trimBar}>
        <TrimBar />
      </div> */}
      <VideoContainer />
    </div>
  );

  return (
    <TabLayout labels={labels} className={scriptsPageStyles.scriptsPageRightTop}>
      {[bRollPreview]}
    </TabLayout>
  );
};

export default BRollPreviewContainer;
