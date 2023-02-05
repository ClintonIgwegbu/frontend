import { useState, useEffect, FunctionComponent } from 'react';
import CommentComponent from './CommentComponent';
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi
} from '../constants/commentApiMock';
import styles from '@styles/components/Comments.module.scss';
import { Comment } from '../types/Comment';
import { ActiveComment } from '../types/ActiveComment';
import CommentForm from './CommentForm';

type CommentsContainerProps = {
  userId: string;
  selectedCommentId: string | null;
  setSelectedCommentId: (commentId: string | null) => void;
};

const CommentsContainer: FunctionComponent<CommentsContainerProps> = ({
  userId,
  selectedCommentId,
  setSelectedCommentId
}) => {
  const [backendComments, setBackendComments] = useState<Array<Comment>>([]);
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null);
  const rootComments = backendComments.filter(backendComment => backendComment.parentId === null);

  const getReplies = (commentId: string) =>
    backendComments
      .filter(backendComment => backendComment.parentId === commentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  // TODO: Here should each of the APIs fetch all comments after a change? Should all comments be fetched only after a change?
  // Should we poll regularly for updates, then fetch all comments if an update is detected? How does YouTube implement this?
  const addComment = (text: string, parentId: string | null) => {
    // createCommentApi(text, parentId).then(comment => {
    //   setBackendComments([comment, ...backendComments]);
    //   setActiveComment(null);
    // });
    createCommentApi(text, parentId);
    // Refresh comment tab after adding a new comment.
    getCommentsApi().then(data => {
      setBackendComments(data);
    });
    setActiveComment(null);
  };

  const updateComment = (text: string, commentId: string) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments: Array<Comment> = backendComments.map(backendComment => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete the comment?')) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          backendComment => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
        if (activeComment && activeComment.id === commentId) {
          setActiveComment(null);
        }
      });
    }
  };

  // TODO: Here we're fetching comments on every render. Maybe rethink this behavior and consider a push vs poll approach. See MVP apple notes.
  useEffect(() => {
    getCommentsApi().then(data => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.generalCommentForm}>
        <CommentForm
          submitLabel='Comment'
          hasSubmitButton={true}
          hasCancelButton={true}
          hasInlineCheckbox={true}
          handleSubmit={text => addComment(text, null)}
          placeholder='Add a comment...'
          showControlsOnFocus={true}
        />
      </div>
      {rootComments.map(rootComment => (
        <CommentComponent
          key={rootComment.id}
          comment={rootComment}
          replies={getReplies(rootComment.id)}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          addComment={addComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
          userId={userId}
          selectedCommentId={selectedCommentId}
          setSelectedCommentId={setSelectedCommentId}
        />
      ))}
    </div>
  );
};

export default CommentsContainer;
