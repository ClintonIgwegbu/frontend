import { useState, useEffect, FunctionComponent } from 'react';
import {
  getBRollAnnotations as getBRollAnnotationsApi,
  createBRollAnnotation as createBRollAnnotationApi,
  deleteBRollAnnotation as deleteBRollAnnotationApi
} from '../constants/bRollAnnotationApiMock';
import styles from '@styles/components/BRollAnnotations.module.scss';
import { BRollAnnotation } from '../types/BRollAnnotation';
import BRollAnnotationComponent from './BRollAnnotationComponent';

type BRollAnnotationsContainerProps = {
  selectedAnnotationId: string | null;
  setSelectedAnnotationId: (commentId: string | null) => void;
};

const BRollAnnotationsContainer: FunctionComponent<BRollAnnotationsContainerProps> = ({
  selectedAnnotationId,
  setSelectedAnnotationId
}) => {
  const [backendAnnotations, setBackendAnnotations] = useState<Array<BRollAnnotation>>([]);

  // TODO: Here should each of the APIs fetch all comments after a change? Should all comments be fetched only after a change?
  // Should we poll regularly for updates, then fetch all comments if an update is detected? How does YouTube implement this?
  const addAnnotation = (videoId: string, videoTitle: string, thumbnailUrl: string) => {
    // createCommentApi(text, parentId).then(comment => {
    //   setBackendComments([comment, ...backendComments]);
    //   setActiveComment(null);
    // });
    createBRollAnnotationApi(videoId, videoTitle, thumbnailUrl);
    // Refresh annotations tab after adding a new comment.
    getBRollAnnotationsApi().then(data => {
      setBackendAnnotations(data);
    });
  };

  const deleteAnnotation = (annotationId: string) => {
    if (window.confirm('Are you sure you want to delete this annotation?')) {
      deleteBRollAnnotationApi().then(() => {
        const updatedBackendAnnotations = backendAnnotations.filter(
          backendAnnotation => backendAnnotation.id !== annotationId
        );
        setBackendAnnotations(updatedBackendAnnotations);
      });
    }
  };

  // TODO: Here we're fetching annotations on every render. Maybe rethink this behavior and consider a push vs poll approach. See MVP apple notes.
  useEffect(() => {
    getBRollAnnotationsApi().then(data => {
      setBackendAnnotations(data);
    });
  }, []);

  return (
    <div className={styles.bRollAnnotationsContainer}>
      {backendAnnotations.map(annotation => (
        <BRollAnnotationComponent
          key={annotation.id}
          annotation={annotation}
          selectedAnnotationId={selectedAnnotationId}
          setSelectedAnnotationId={setSelectedAnnotationId}
        />
      ))}
    </div>
  );
};

export default BRollAnnotationsContainer;
