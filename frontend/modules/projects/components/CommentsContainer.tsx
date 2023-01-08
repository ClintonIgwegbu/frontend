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
};

const CommentsContainer: FunctionComponent<CommentsContainerProps> = ({ userId }) => {
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

  // TODO: Seems like we're fetching comments on every component render. This seems expensive. How often is a component
  // rendered though? I feel it's only re-rendered after an update to its state. Or I may be wrong? I think useEffect may be
  // called after a component is mounted. Which might mean after any action that triggers a rerender e.g. a page refresh. If the
  // dependency array has items then we check for an update to these items and call useEffect? Otherwise we call it after a page refresh? I
  // used to think of this as being called on every CPU cycle, if the dependency array is empty, or something stupid like that. But I don't think
  // that is how it is called. Probably what happens is that if the dependency array is empty, then the default behaviour of useEffect is to be called
  // everytime we have an event that triggers rerender of the component. What type of event might this be? Well a page refresh would always trigger a rerender.
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
        />
      ))}
    </div>
  );
};

export default CommentsContainer;
