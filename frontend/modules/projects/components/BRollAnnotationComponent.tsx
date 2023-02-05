import { FunctionComponent, useEffect, useRef } from 'react';
import styles from '@styles/components/BRollAnnotations.module.scss';
import { BRollAnnotation } from '../types/BRollAnnotation';

type BRollAnnotationComponentProps = {
  annotation: BRollAnnotation;
  selectedAnnotationId: string | null;
  setSelectedAnnotationId: (annotationId: string | null) => void;
};

const BRollAnnotationComponent: FunctionComponent<BRollAnnotationComponentProps> = ({
  annotation,
  selectedAnnotationId,
  setSelectedAnnotationId
}) => {
  const annotationRef = useRef<HTMLDivElement>(null);
  const commentButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (commentButtonRef.current) {
      if (annotation.commentIds.length === 0) {
        commentButtonRef.current.children[0].classList.remove(styles.hidden);
        commentButtonRef.current.children[1].classList.add(styles.hidden);
      } else {
        commentButtonRef.current.children[0].classList.add(styles.hidden);
        commentButtonRef.current.children[1].classList.remove(styles.hidden);
      }
    }
  });

  useEffect(() => {
    // Highlight selected annotation and scroll it into view.
    const current = annotationRef.current;
    if (current) {
      if (selectedAnnotationId === annotation.id) {
        current.classList.add(styles.annotationHover);
        current.scrollIntoView();
      }
    }
    return () => {
      if (current) {
        current.classList.remove(styles.annotationHover);
      }
    };
  }, [annotation.id, selectedAnnotationId]);

  return (
    <>
      <div
        key={annotation.id}
        className={styles.bRollAnnotation}
        ref={annotationRef}
        onClick={() => setSelectedAnnotationId(annotation.id)}>
        <img src={annotation.thumbnailUrl} alt={annotation.videoTitle} />
        <div className={styles.annotationMetadata}>
          <span>{annotation.videoTitle}</span>
          <button className={styles.commentButton} ref={commentButtonRef}>
            <i className={'ri-chat-new-line'} />
            <i className={`ri-chat-4-line`} />
          </button>
        </div>
      </div>
    </>
  );
};

export default BRollAnnotationComponent;
