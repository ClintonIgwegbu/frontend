import React, { FunctionComponent } from 'react';
import TabLayout from './TabLayout';
import scriptsPageStyles from '@styles/pages/ScriptsPage.module.scss';
import bRollStyles from '@styles/components/BRollPreview.module.scss';
import TrimBar from './TrimBar';

const BRollPreviewContainer: FunctionComponent = () => {
  const labels = ['B-Roll Preview'];
  const bRollPreview = (
    <div key='b-roll'>
      {/* <iframe
        width='100%'
        height='100%'
        name='B-roll preview'
        title='B-roll preview'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className={`${bRollStyles.bRollPreview}`}
        id='b-roll-preview'
      /> */}
      {/* TODO: Check if id can be used to link to video element as done here */}
      <video width='100%' height='100%' controls id='b-roll-preview'>
        <source src='/first_youtube_video_1.mov' />
        Video unsupported by your browser.
      </video>
      {/* <TrimBar /> */}
    </div>
  );

  return (
    <TabLayout labels={labels} className={scriptsPageStyles.scriptsPageRightTop}>
      {[bRollPreview]}
    </TabLayout>
  );
};

export default BRollPreviewContainer;
