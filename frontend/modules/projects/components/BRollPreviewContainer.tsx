import React, { FunctionComponent } from 'react';
import TabLayout from './TabLayout';
import styles from '@styles/components/BRollPreview.module.scss';

const BRollPreviewContainer: FunctionComponent = () => {
  const labels = ['B-Roll Preview'];
  const bRollPreview = (
    <iframe
      width='100%'
      height='100%'
      name='B-roll preview'
      title='B-roll preview'
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  );

  return (
    <TabLayout labels={labels} className={styles.bRollPreviewContainer}>
      {[bRollPreview]}
    </TabLayout>
  );
};

export default BRollPreviewContainer;
