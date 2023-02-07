import { FunctionComponent, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { ActiveComment, ActiveCommentType } from '../types/ActiveComment';
import { Comment } from '../types/Comment';
import CommentForm from './CommentForm';
import styles from '@styles/components/Comments.module.scss';
import { ButtonSize, ButtonStyle } from '@modules/shared/types/buttonTypes';
import Button from '@modules/shared/components/Button';

type CommentComponentProps = {
  comment: Comment;
  replies: Array<Comment>;
  userId: string;
  activeComment: ActiveComment | null;
  selectedCommentId: string | null;
  setSelectedCommentId: (commentId: string | null) => void;
  setActiveComment: React.Dispatch<SetStateAction<ActiveComment | null>>;
  addComment: (text: string, parentId: string | null) => void;
  updateComment: (text: string, commentId: string) => void;
  deleteComment: (commentId: string) => void;
  parentId?: string;
};

const CommentComponent: FunctionComponent<CommentComponentProps> = ({
  comment,
  replies,
  userId,
  activeComment,
  selectedCommentId,
  setSelectedCommentId,
  setActiveComment,
  addComment,
  updateComment,
  deleteComment,
  parentId
}) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === ActiveCommentType.Editing;
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === ActiveCommentType.Replying;
  const canDelete = userId === comment.userId && replies.length === 0;
  // TODO: Include text to indicate that comment has been edited.
  const canEdit = userId === comment.userId;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  const commentHead = (
    <div className={styles.commentHead}>
      <div className={styles.commentAuthor}>{comment.username}</div>
      <div className={styles.commentTimestamp}>{createdAt}</div>
    </div>
  );

  const commentBody = (
    <>
      {!isEditing && <div className={styles.commentText}>{comment.body}</div>}
      {isEditing && (
        <CommentForm
          submitLabel='Update'
          hasSubmitButton={true}
          hasCancelButton={true}
          handleSubmit={(text: string) => updateComment(text, comment.id)}
          handleCancel={() => {
            setActiveComment(null);
          }}
          initialText={comment.body}
        />
      )}
    </>
  );

  const commentActions = useMemo(
    () => (
      <div className={styles.commentActions}>
        {
          <Button
            label={'Reply'}
            onClick={() => setActiveComment({ id: comment.id, type: ActiveCommentType.Replying })}
            buttonStyle={ButtonStyle.NoBackground}
            buttonSize={ButtonSize.Minimal}
          />
        }
        {canEdit && (
          <Button
            label={'Edit'}
            onClick={() => setActiveComment({ id: comment.id, type: ActiveCommentType.Editing })}
            buttonStyle={ButtonStyle.NoBackground}
            buttonSize={ButtonSize.Minimal}
          />
        )}
        {canDelete && (
          <Button
            label={'Delete'}
            onClick={() => deleteComment(comment.id)}
            buttonStyle={ButtonStyle.NoBackground}
            buttonSize={ButtonSize.Minimal}
          />
        )}
      </div>
    ),
    [canEdit, canDelete, setActiveComment, comment.id, deleteComment]
  );

  const getReplyClass = (replyId: string) => {
    return replyId === selectedCommentId
      ? `${styles.reply} ${styles.commentHover}`
      : `${styles.reply}`;
  };

  // TODO: Should this really be an effect?
  useEffect(() => {
    // Highlight selected comment and scroll it into view.
    const current = commentRef.current;
    if (current) {
      if (selectedCommentId === comment.id && (parentId === null || parentId === undefined)) {
        current.classList.add(styles.commentHover);
        current.scrollIntoView();
      }
    }
    return () => {
      if (current) {
        current.classList.remove(styles.commentHover);
      }
    };
  }, [comment.id, selectedCommentId, parentId]);

  return (
    <>
      <div
        key={comment.id}
        className={styles.comment}
        ref={commentRef}
        onClick={() => setSelectedCommentId(comment.id)}>
        <div className={styles.commentWithoutReplyForm}>
          <div className={styles.commentImageContainer}>
            <img src='/user-icon.png' />
          </div>

          <div className={styles.commentRightPart}>
            {commentHead}
            {commentBody}
            {commentActions}
          </div>
        </div>

        {isReplying && (
          <CommentForm
            submitLabel='Reply'
            hasSubmitButton={true}
            hasCancelButton={true}
            handleSubmit={text => addComment(text, replyId)}
            handleCancel={() => {
              setActiveComment(null);
            }}
            placeholder='Add a reply...'
          />
        )}
      </div>

      {replies.length > 0 && (
        <div className={styles.replies}>
          {replies.map(reply => (
            <div className={getReplyClass(reply.id)} key={reply.id}>
              <CommentComponent
                comment={reply}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                userId={userId}
                selectedCommentId={selectedCommentId}
                setSelectedCommentId={setSelectedCommentId}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CommentComponent;
