import { FunctionComponent } from 'react';
import CommentsContainer from './CommentsContainer';
import TabLayout from './TabLayout';
import styles from '@styles/pages/ScriptsPage.module.scss';
import { Editor } from '@tiptap/react';
import BRollAnnotationsContainer from './BRollAnnotationsContainer';

type AnnotationsContainerProps = {
  selectedBRollAnnotationId: string | null;
  selectedCommentId: string | null;
  setSelectedCommentId: (id: string | null) => void;
  setSelectedBRollAnnotationId: (id: string | null) => void;
};

const AnnotationsContainer: FunctionComponent<AnnotationsContainerProps> = ({
  selectedBRollAnnotationId,
  selectedCommentId,
  setSelectedBRollAnnotationId,
  setSelectedCommentId
}) => {
  const labels = ['B-Roll Annotations', 'Comments'];

  return (
    <TabLayout labels={labels} className={styles.scriptsPageRightBottom}>
      {[
        // <div key='empty'></div>,
        <BRollAnnotationsContainer
          key={0}
          selectedAnnotationId={selectedBRollAnnotationId}
          setSelectedAnnotationId={setSelectedBRollAnnotationId}
        />,
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
