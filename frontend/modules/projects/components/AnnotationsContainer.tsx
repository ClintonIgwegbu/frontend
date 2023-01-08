import { FunctionComponent } from 'react';
import CommentsContainer from './CommentsContainer';
import TabLayout from './TabLayout';
import styles from '@styles/pages/ScriptsPage.module.scss';

const AnnotationsContainer: FunctionComponent = () => {
  const labels = ['B-Roll Annotations', 'Comments'];

  return (
    <TabLayout labels={labels} className={styles.scriptsPageRightBottom}>
      {[<div key='empty'></div>, <CommentsContainer key={1} userId={'1'} />]}
    </TabLayout>
  );
};

export default AnnotationsContainer;
