import React, { FunctionComponent } from 'react';
import TabLayout from './TabLayout';
import scriptsPageStyles from '@styles/pages/ScriptsPage.module.scss';
import VideoContainer from './VideoContainer';

const BRollPreviewContainer: FunctionComponent = () => {
  const labels = ['B-Roll Preview'];
  const tabPanels = [<VideoContainer key='b-roll' />];

  return (
    <TabLayout labels={labels} className={scriptsPageStyles.scriptsPageRightTop}>
      {tabPanels}
    </TabLayout>
  );
};

export default BRollPreviewContainer;
