import { FunctionComponent } from 'react';
import CommentsContainer from './CommentsContainer';
import TabLayout from './TabLayout';
import styles from '@styles/pages/ScriptsPage.module.scss';
import { Editor } from '@tiptap/react';

type AnnotationsContainerProps = {
  selectedCommentId: string | null;
  setSelectedCommentId: (commentId: string | null) => void;
};

const AnnotationsContainer: FunctionComponent<AnnotationsContainerProps> = ({
  selectedCommentId,
  setSelectedCommentId
}) => {
  const labels = ['B-Roll Annotations', 'Comments'];

  return (
    <TabLayout labels={labels} className={styles.scriptsPageRightBottom}>
      {[
        <div key='empty'></div>,
        <CommentsContainer
          key={1}
          userId={'1'}
          selectedCommentId={selectedCommentId}
          setSelectedCommentId={setSelectedCommentId}
        />
      ]}
    </TabLayout>
  );
};

export default AnnotationsContainer;
