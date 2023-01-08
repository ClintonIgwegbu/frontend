import { Comment } from '../types/Comment';

export const getComments = async () => {
  const comments: Array<Comment> = [
    {
      id: '1',
      body: 'First comment',
      username: 'Jack',
      userId: '1',
      parentId: null,
      createdAt: '2021-08-16T23:00:33.010+02:00'
    },
    {
      id: '2',
      body: 'Second comment',
      username: 'John',
      userId: '2',
      parentId: null,
      createdAt: '2021-08-16T23:00:33.010+02:00'
    },
    {
      id: '3',
      body: 'First comment first child',
      username: 'John',
      userId: '2',
      parentId: '1',
      createdAt: '2021-08-16T23:00:33.010+02:00'
    },
    {
      id: '4',
      body: 'Second comment second child',
      username: 'John',
      userId: '2',
      parentId: '2',
      createdAt: '2021-08-16T23:00:33.010+02:00'
    }
  ];
  return comments;
};

export const createComment = async (text: string, parentId: string | null = null) => {
  const newComment: CommentDetails = {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: '1',
    username: 'John',
    createdAt: new Date().getTime()
  };
  return newComment;
};

export const updateComment = async (text: string) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
